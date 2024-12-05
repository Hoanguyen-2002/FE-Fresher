import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Image,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Table,
  TableColumnsType,
  Tabs,
  TabsProps,
} from 'antd';
import api from '../api/apiConfig';
import {
  CheckCircleFilled,
  CheckSquareFilled,
  ClockCircleFilled,
  SearchOutlined,
  TruckFilled,
} from '@ant-design/icons';
import { formatPrice } from '../utils/priceValidation';
import { OrderStatus } from '../enum/OrderStatus';
import axios from 'axios';
import CancelOrderButton from '../components/button/CancelOrderButtonAdmin';
import { ORDER_DENY_REASONS } from '../utils/const';

const { Option } = Select;

interface OrderItem {
  bookId: string;
  name: string;
  thumbnail: string;
  basePrice: number;
  discountPrice: number;
  finalPrice: number;
  quantity: number;
  total: number;
  note: string;
}

const columns: TableColumnsType<FormatedOrder> = [
  { title: 'Mã đơn hàng', dataIndex: 'orderId', key: 'orderId' },
  // { title: 'Sản phẩm', dataIndex: 'items', key: 'items' },
  Table.EXPAND_COLUMN,
  { title: 'Tổng đơn', dataIndex: 'totalFormated', key: 'totalFormated' },
  { title: 'Trạng thái', dataIndex: 'statusElement', key: 'statusElement' },
  { title: 'Người nhận', dataIndex: 'recipient', key: 'recipient' },
  { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
  // { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
  { title: 'Vận chuyển', dataIndex: 'shippingMethod', key: 'shippingMethod' },
  { title: 'Thanh toán', dataIndex: 'paymentMethod', key: 'paymentMethod' },
  { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Cập nhật cuối', dataIndex: 'lastUpdated', key: 'lastUpdated' },
  { title: 'Thao tác', dataIndex: 'action', key: 'action' },
];

interface FormatedOrder {
  orderId: string;
  orderDetails: OrderItem[];
  status: OrderStatus;
  statusElement: JSX.Element;
  recipient: string;
  phone: string;
  address: string;
  shippingMethod: string;
  shippingFee: number;
  paymentMethod: string;
  total: number;
  totalFormated: number;
  lastUpdated: string;
  createdAt: string;
  action: JSX.Element;
  totalDetail: string;
  note: string;
  email: string;
}

const ListOrder: React.FC = () => {
  const [orders, setOrders] = useState<FormatedOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchBy, setSearchBy] = useState<string>('');
  const [sortRequest, setSortRequest] = useState<string>('-updatedAt');
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.ALL);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>('0');
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const fetchOrders = async (
    searchKeyword: string,
    searchBy: string,
    sortRequest: string,
    status: OrderStatus,
    pageNo: number,
    pageSize: number
  ) => {
    setLoading(true);
    try {
      console.log({
        searchKeyword: searchKeyword,
        searchBy: searchBy,
        sortRequest:
          status === OrderStatus.PENDING ? '-createdAt' : sortRequest,
        status: status,
        pageNo: pageNo - 1,
        pageSize: pageSize,
      });
      const response = await api.post('/v1/admin/orders', {
        searchKeyword: searchKeyword,
        searchBy: searchBy,
        sortRequest:
          status === OrderStatus.PENDING ? '-createdAt' : sortRequest,
        status: status,
        pageNo: pageNo - 1,
        pageSize: pageSize,
      });
      console.log(response);
      const { data } = response.data;
      setTotal(data.metaData.totalElements);
      const orderList = data.content.map((order: any) => ({
        orderId: order.orderId,
        orderDetails: order.orderDetails,
        status: order.status,
        statusElement:
          order.status === OrderStatus.PENDING ? (
            <div className='bold text-[#FCA510]'>
              <ClockCircleFilled /> CHỜ XÁC NHẬN
            </div>
          ) : order.status === OrderStatus.PROCESSING ? (
            <div className='bold text-[#0000FF]'>
              <CheckCircleFilled /> CHỜ LẤY HÀNG
            </div>
          ) : order.status === OrderStatus.SHIPPING ? (
            <div className='bold text-[#00CCFF]'>
              <TruckFilled /> ĐANG GIAO
            </div>
          ) : order.status === OrderStatus.COMPLETE ? (
            <div className='bold text-[#52c41a]'>
              <CheckSquareFilled /> HOÀN THÀNH
            </div>
          ) : (
            <div className='bold text-[#FF0000]'>
              <CheckSquareFilled /> ĐÃ HỦY
            </div>
          ),
        recipient: order.recipient,
        phone: order.phone,
        address: order.address,
        shippingMethod: order.shippingMethod,
        shippingFee: order.shippingFee,
        paymentMethod: order.paymentMethod,
        total: order.total,
        totalFormated: formatPrice(order.total),
        lastUpdated: order.lastUpdated,
        createdAt: order.createdAt,
        email: order.email,
        note: order.note,
        action:
          order.status === OrderStatus.PENDING ? (
            <div>
              <Popconfirm
                className='mr-2 mb-2'
                title={'Bạn có chắc chắn xác nhận đơn hàng ' + order.orderId}
                okText='Xác nhận đơn'
                cancelText='Hủy'
                onConfirm={(e) => confirmApprove(order.orderId, e)}
              >
                <Button className='bold text-[#0000FF]'>XÁC NHẬN ĐƠN</Button>
              </Popconfirm>
              <Popconfirm
                title={'Bạn có chắc chắn hủy đơn hàng ' + order.orderId}
                okText='Xác nhận'
                cancelText='Hủy'
              >
                <CancelOrderButton
                  onConfirm={handleDenyOrder}
                  className='bold text-[#ff3300]'
                  reasons={ORDER_DENY_REASONS}
                  orderId={order.orderId}
                />
              </Popconfirm>
            </div>
          ) : order.status === OrderStatus.PROCESSING ? (
            <div>
              <Popconfirm
                className='mr-2 mb-2'
                title={'Bạn có chắc chắn đang giao đơn hàng ' + order.orderId}
                okText='Xác nhận giao'
                cancelText='Hủy'
                onConfirm={(e) =>
                  updateStatus(order.orderId, e, OrderStatus.SHIPPING)
                }
              >
                <Button className='bold text-[#00CCFF]'>ĐANG GIAO HÀNG</Button>
              </Popconfirm>
              <Popconfirm
                title={'Bạn có chắc chắn hủy đơn hàng ' + order.orderId}
                okText='Xác nhận'
                cancelText='Hủy'
              >
                <CancelOrderButton
                  onConfirm={handleDenyOrder}
                  className='bold text-[#ff3300]'
                  orderId={order.orderId}
                  reasons={ORDER_DENY_REASONS}
                />
              </Popconfirm>
            </div>
          ) : order.status === OrderStatus.SHIPPING ? (
            <Popconfirm
              className='mr-2 mb-2'
              title={'Bạn có chắc chắn hoàn tất đơn hàng ' + order.orderId}
              okText='Hoàn tất'
              cancelText='Hủy'
              onConfirm={(e) =>
                updateStatus(order.orderId, e, OrderStatus.COMPLETE)
              }
            >
              <Button className='bold text-[#52c41a]'>ĐÃ GIAO HÀNG</Button>
            </Popconfirm>
          ) : order.status === OrderStatus.COMPLETE ? (
            <div></div>
          ) : (
            <div className='bold text-[#FF0000]'></div>
          ),
      }));
      setOrders(orderList);
      console.log(orderList);
    } catch (error) {
      console.error('Error fetching customers:', error);
      message.error('Có vẻ như có lỗi xảy ra. Vui lòng thử lại!', 10);
    } finally {
      setLoading(false);
    }
  };

  // Remove search on input change to synchronize with others pages
  useEffect(() => {
    fetchOrders(searchKeyword, searchBy, sortRequest, status, pageNo, pageSize);
  }, [searchBy, sortRequest, status, pageNo, pageSize, selectedTab]);

  const confirmApprove = async (
    orderId: string,
    e?: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e) {
      console.log(e);
      try {
        const response = await api.post(`/v1/admin/orders/${orderId}`);
        console.log(response);
        message.success('XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG.');
        setSelectedTab('2');
        setStatus(OrderStatus.PROCESSING);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error);
          const backendError = error.response.data.msg;
          console.error('Approve order failed:', backendError);
          message.error(backendError);
          if(selectedTab!=='0'){
              setSelectedTab('1');
          }
          fetchOrders(
            searchKeyword,
            searchBy,
            sortRequest,
            status,
            pageNo,
            pageSize
          );
        }
      }
    }
  };

  const updateStatus = async (
    orderId: string,
    e?: React.MouseEvent<HTMLElement, MouseEvent>,
    newOrderStatus?: string
  ) => {
    if (e) {
      console.log(e);
      try {
        const response = await api.put(`/v1/admin/orders/${orderId}`, {
          newOrderStatus: newOrderStatus,
        });
        console.log(response);
        message.success('CẬP NHẬT ĐƠN HÀNG THÀNH CÔNG.');
        switch (newOrderStatus) {
          case OrderStatus.SHIPPING:
            {
              setSelectedTab('3');
              setStatus(OrderStatus.SHIPPING);
            }
            break;
          case OrderStatus.COMPLETE:
            {
              setSelectedTab('4');
              setStatus(OrderStatus.COMPLETE);
            }
            break;
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error);
          const backendError = error.response.data.msg;
          console.error('Approve order failed:', backendError);
          message.error(backendError);
          fetchOrders(
            searchKeyword,
            searchBy,
            sortRequest,
            status,
            pageNo,
            pageSize
          );
        }
      }
    }
  };

  const handleDenyOrder = async (reason: string, orderId: string) => {
    try {
      console.log(orderId);
      const response = await api.put(`/v1/admin/orders/${orderId}`, {
        newOrderStatus: OrderStatus.DENIED,
        message: reason,
      });
      console.log(response);
      setStatus(OrderStatus.CANCEL);
      setSelectedTab('5');
      message.success('HỦY ĐƠN HÀNG THÀNH CÔNG.');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.msg;
        console.error('Cancel order failed:', backendError);
        message.error('HỦY ĐƠN HÀNG THẤT BẠI.');
      }
    }
  };

  const handleTabChange = async (key: string) => {
    setLoading(true);
    try {
      setSelectedTab(key);
      const statusSelected = getStatusFromKey(key);
      console.log(statusSelected);
      if (statusSelected === '') {
        setStatus(OrderStatus.ALL);
      } else {
        setStatus(statusSelected);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
    setLoading(false);
    setPageNo(1);
  };

  const getStatusFromKey = (key: string) => {
    switch (key) {
      case '0':
        return OrderStatus.ALL;
      case '1':
        return OrderStatus.PENDING;
      case '2':
        return OrderStatus.PROCESSING;
      case '3':
        return OrderStatus.SHIPPING;
      case '4':
        return OrderStatus.COMPLETE;
      case '5':
        return OrderStatus.CANCEL;
      default:
        return '';
    }
  };

  useEffect(() => {
    handleTabChange('0');
  }, []);

  const items: TabsProps['items'] = [
    { key: '0', label: 'Tất cả đơn hàng' },
    { key: '1', label: 'Chờ xác nhận' },
    { key: '2', label: 'Chờ lấy hàng' },
    { key: '3', label: 'Đơn đang giao' },
    { key: '4', label: 'Đơn hoàn thành' },
    { key: '5', label: 'Đơn hủy' },
  ];

  const handleTableChange = (pagination: any) => {
    setPageNo(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearch = () => {
    fetchOrders(searchKeyword, searchBy, sortRequest, status, pageNo, pageSize);
    setPageNo(1);
  };

  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + '...';
  };

  const handleExpandedRowChange = (
    expanded: boolean,
    record: FormatedOrder
  ) => {
    const newExpandedRowKeys = expanded
      ? [...expandedRowKeys, record.orderId]
      : expandedRowKeys.filter((key) => key !== record.orderId);
    setExpandedRowKeys(newExpandedRowKeys);
  };

  const handleSelectChange = (value: string) => {
    setSearchBy(value);
    console.log('Selected:', value);
  };

  return (
    <div>
      <Row className='justify-end m-6'>
        <Col pull={1} className='flex mr-3'>
          <Select
            defaultValue='recipent'
            placeholder='Tìm theo tiêu chí'
            onChange={handleSelectChange}
            style={{ width: 150 }}
            defaultActiveFirstOption
          >
            <Option value='recipent' selected>
              Người nhận
            </Option>
            <Option value='orderId'>Mã đơn hàng</Option>
          </Select>
        </Col>
        <Col pull={1} className='flex gap-4'>
          <Input
            value={searchKeyword}
            onPressEnter={handleSearch}
            type='text'
            placeholder='Tìm kiếm'
            onChange={(e) => setSearchKeyword(e.target.value)}
            className='w-[300px]'
          />
          <Button
            onClick={handleSearch}
            className='bg-soft-red text-white border-soft-red'
          >
            <SearchOutlined />
          </Button>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey='0'
        activeKey={selectedTab}
        items={items}
        onChange={handleTabChange}
        size='large'
        className='mt-6 ml-10'
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Table
            className='table-responsive overflow-x-auto w-full md:w-full lg:w-full sm:px-4 md:px-6 lg:px-8'
            columns={columns}
            rowKey='orderId'
            loading={loading}
            expandable={{
              expandedRowRender: (record) => (
                <div>
                  {record.status === OrderStatus.CANCEL ||
                  record.status === OrderStatus.DENIED ? (
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4 text-[red]'>
                      <b className='mr-2'>Lý do hủy: </b>
                      <span>{record.note}</span>
                    </div>
                  ) : null}
                  <div className='flex flex-col md:flex-row gap-4'>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4 md:w-3/6'>
                      <table className='w-full'>
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th className='text-left font-semibold'>Đơn giá</th>
                            <th className='text-left font-semibold'>
                              Số lượng
                            </th>
                            <th className='text-left font-semibold'>
                              Thành tiền
                            </th>
                            {/* {record.note && (
                                                            <th className="text-left font-semibold">Ghi chú</th>
                                                        )} */}
                          </tr>
                        </thead>
                        <tbody>
                          {record.orderDetails &&
                            record.orderDetails.map((item: OrderItem) => (
                              <tr>
                                <td className='py-4'>
                                  <div className='flex items-center'>
                                    <Image
                                      width={50}
                                      height={50}
                                      src={item.thumbnail}
                                      alt={item.name}
                                      fallback='https://via.placeholder.com/50'
                                    />
                                    <span className='font-semibold ml-3'>
                                      {truncateString(item.name, 20)}
                                    </span>
                                  </div>
                                </td>
                                <td className='py-4'>
                                  {formatPrice(item.finalPrice)}
                                </td>
                                <td className='py-4'>
                                  <div className='flex items-center'>
                                    <span className='text-center w-8'>
                                      x<span>{item.quantity}</span>
                                    </span>
                                  </div>
                                </td>
                                <td className='py-4'>
                                  {formatPrice(item.finalPrice * item.quantity)}
                                </td>
                                {item.note && (
                                  <td className='text-left text-soft-red font-semibold'>
                                    {item.note}
                                  </td>
                                )}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4 md:w-2/6'>
                      <h2 className='text-lg font-semibold mb-4'>
                        Thông tin giao hàng
                      </h2>
                      <div>
                        <b>Người nhận: </b>
                        <span>{record.recipient}</span>
                      </div>
                      <div>
                        <b>Số điện thoại: </b>
                        <span>{record.phone}</span>
                      </div>
                      <div>
                        <b>Địa chỉ: </b>
                        <span>{record.address}</span>
                      </div>
                      <div>
                        <b>Email: </b>
                        <span>{record.email}</span>
                      </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4 md:w-2/6'>
                      <h2 className='text-lg font-semibold mb-4'>
                        Chi tiết thanh toán
                      </h2>
                      <div className='flex justify-between mb-2'>
                        <span>Tổng tiền hàng</span>
                        <span>
                          {formatPrice(record.total - record.shippingFee)}
                        </span>
                      </div>
                      <div className='flex justify-between mb-2'>
                        <span>Tổng phí vận chuyển</span>
                        <span>{formatPrice(record.shippingFee)}</span>
                      </div>
                      <hr className='my-2' />
                      <div className='flex justify-between mb-2'>
                        <span className='font-semibold'>Tổng thanh toán</span>
                        <span className='font-semibold'>
                          {formatPrice(record.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ),
              onExpand: handleExpandedRowChange,
            }}
            dataSource={orders}
            pagination={{
              current: pageNo,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
            onChange={handleTableChange}
            expandedRowKeys={expandedRowKeys}
          />
        </div>
      )}
    </div>
  );
};

export default ListOrder;
