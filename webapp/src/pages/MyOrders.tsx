import { CheckCircleFilled, CheckSquareFilled, ClockCircleFilled, TruckFilled } from "@ant-design/icons";
import { Image, message, Pagination, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/priceFormat";
import api from "../api/apiConfig";
import { OrderStatus } from '../enum/OrderStatus';
import { useNavigate } from "react-router-dom";
import NoOrderFound from "../components/order/NoOrderFound";
import axios from "axios";
import CancelOrderButton from "../components/button/CancelOrderButton";
import { ORDER_CANCEL_REASONS } from "../types/const";

interface OrderItem {
    bookId: string;
    name: string;
    thumbnail: string;
    basePrice: number;
    discountPrice: number;
    finalPrice: number;
    quantity: number;
    total: number;
    isReviewed: boolean;
    orderDetailId: string;
}
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
}

interface MetaData {
    limit: number;
    offSet: number;
    totalElements: number;
}

const MyOrders: React.FC = () => {
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<FormatedOrder[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>('1');
    const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({});
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [searchBy, setSearchBy] = useState<string>("");
    const [metaData, setMetaData] = useState<MetaData>({
        limit: 10,
        offSet: 0,
        totalElements: 10,
    });
    const [total, setTotal] = useState<number>(0);
    const [sortRequest, setSortRequest] = useState<string>('-updatedAt');
    const navigate = useNavigate();


    const items: TabsProps['items'] = [
        { key: '1', label: 'Chờ xác nhận' },
        { key: '2', label: 'Chờ lấy hàng' },
        { key: '3', label: 'Đơn đang giao' },
        { key: '4', label: 'Đơn hoàn thành' },
        { key: '5', label: 'Đơn hủy' },
    ];

    const getStatusFromKey = (key: string) => {
        switch (key) {
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

    const fetchOrders = async (searchKeyword: string,
        searchBy: string,
        sortRequest: string,
        status: OrderStatus,
        pageNo: number,
        pageSize: number
    ) => {
        setLoading(true)
        try {
            const response = await api.post('/v1/accounts/myOrders',
                {
                    searchKeyword: searchKeyword,
                    searchBy: searchBy,
                    sortRequest: (status === OrderStatus.PENDING ? '-createdAt' : sortRequest),
                    status: status,
                    pageNo: (pageNo - 1),
                    pageSize: pageSize
                });
            console.log(response);
            const { data } = response.data;
            setMetaData(data.metaData);
            setTotal(data.metaData.totalElements);
            const orderList = data.content.map((order: any) => ({
                orderId: order.orderId,
                orderDetails: order.orderDetails,
                status: order.status,
                statusElement: (order.status === OrderStatus.PENDING ? <div className='bold text-[#FCA510]'><ClockCircleFilled /> CHỜ XÁC NHẬN</div> :
                    (order.status === OrderStatus.PROCESSING ? <div className='bold text-[#0000FF]'><CheckCircleFilled /> CHỜ LẤY HÀNG</div> :
                        (order.status === OrderStatus.SHIPPING ? <div className='bold text-[#00CCFF]'><TruckFilled /> ĐANG GIAO</div> :
                            (order.status === OrderStatus.COMPLETE ? <div className='bold text-[#52c41a]'><CheckSquareFilled /> HOÀN THÀNH</div> :
                                <div className='bold text-[#FF0000]'><CheckSquareFilled /> ĐÃ HỦY</div>
                            )))),
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
            }));
            setOrders(orderList);
            console.log(orderList);
        } catch (error) {
            console.error('Error fetching customers:', error);
            message.error('Có vẻ như có lỗi xảy ra. Vui lòng thử lại!', 10);
        } finally {
            setLoading(false);
        }
    }


    const handleTabChange = async (key: string) => {
        setLoading(true);
        try {
            setSelectedTab(key);
            const statusSelected = getStatusFromKey(key);
            console.log(statusSelected);
            setStatus(statusSelected ? statusSelected : OrderStatus.PENDING);
            fetchOrders(searchKeyword, searchBy, sortRequest, statusSelected ? statusSelected : OrderStatus.PENDING, pageNo, pageSize);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleTabChange('1');
    }, []);

    useEffect(() => {
        fetchOrders(searchKeyword, searchBy, sortRequest, status, pageNo, pageSize);
    }, [searchKeyword, searchBy, sortRequest, status, pageNo, pageSize]);


    const truncateString = (str: string, maxLength: number) => {
        if (str.length <= maxLength) {
            return str;
        }
        return str.slice(0, maxLength) + '...';
    };

    const renderOrders = (orders: FormatedOrder[]) => {
        return orders.map((order) => <OrderDetail key={order.orderId} order={order} />);
    };

    const handlePageChange = (page: number) => {
        setPageNo(page);
    };

    const cancelOrder = async (reason: string, orderId: string) => {
        console.log("gọi hàm hủy")
        try {
            console.log(orderId);
            const response = await api.put(`/v1/accounts/myOrders/${orderId}`, { message: reason });
            console.log(response);
            setStatus(OrderStatus.CANCEL);
            setSelectedTab('5');
            message.success("HỦY ĐƠN HÀNG THÀNH CÔNG.");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendError = error.response.data.msg;
                console.error("Cancel order failed:", backendError);
                message.error("HỦY ĐƠN HÀNG THẤT BẠI.");
            }
        }
    }

    const OrderDetail = ({ order }: { order: FormatedOrder }) => {
        const isExpanded = expandedOrders[order.orderId] || false;

        const toggleExpand = () => {
            setExpandedOrders((prevState) => ({
                ...prevState,
                [order.orderId]: !prevState[order.orderId],
            }));
        };

        return (
            <div className="mb-4 p-2 bg-[#eeeeee]">
                <section aria-labelledby="recent-heading">
                    <div className="mx-auto sm:px-2 lg:px-8">
                        <div className="max-w-full bg-[#eeeeee] mx-auto space-y-8 sm:px-4 lg:px-0">
                            <div
                                key={order.orderId}
                                className="bg-white shadow-lg sm:rounded-lg"
                            >
                                <div className="flex items-center p-4 border-b border-soft-red gap-4">
                                    <div className="w-[50%] grid grid-cols-3 gap-6 text-sm items-center">
                                        <div className="w-full">
                                            <dt className="font-medium text-gray-900 line-clamp-1">Mã đơn hàng: <span className="font-thin text-grey-[500] w-[100px]">{order.orderId}</span></dt>
                                        </div>
                                        <div className="hidden lg:flex gap-1 h-[24px] lg:justify-center lg:items-center font-medium text-gray-900">
                                            Ngày đặt: <span className="!text-gray-500"><time dateTime={order.createdAt}>{order.createdAt}</time></span>
                                        </div>
                                        <div className="hidden lg:flex lg:gap-1">
                                            <dt className="font-medium text-gray-900"></dt>
                                            <dd className="mt-1 font-medium text-gray-900">{order.statusElement}</dd>
                                        </div>
                                    </div>
                                    <div className="w-[50%] flex justify-end items-center gap-3">
                                        {order.status === OrderStatus.PENDING && (
                                            <CancelOrderButton onConfirm={cancelOrder} reasons={ORDER_CANCEL_REASONS} orderId={order.orderId} className="flex items-center justify-center bg-white py-2 px-2.5 border border-soft-red rounded-md shadow-sm text-sm font-medium text-soft-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                                        )}
                                        <button
                                            onClick={() => navigate(`/profile/myOrders/orderDetail/${order.orderId}`)}
                                            className="flex items-center justify-center bg-soft-red py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-white hover:border-soft-red hover:text-soft-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <span>Chi tiết đơn</span>
                                            <span className="sr-only">{order.orderId}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Products */}
                                <ul role="list" className="border-b border-soft-red">
                                    {order.orderDetails.slice(0, isExpanded ? order.orderDetails.length : 1).map((product) => (
                                        <li key={product.bookId} className="p-4 sm:p-6">
                                            <div className="flex justify-between">
                                                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                                                    <Image src={product.thumbnail}
                                                        alt={product.name} fallback="https://via.placeholder.com/128" />
                                                </div>
                                                <div className="flex flex-col justify-between ml-6 text-sm">
                                                    <div className="font-medium text-gray-900 text-left">
                                                        <p className="text-lg"><a onClick={() => navigate(`/book/${product.bookId}`)}>{truncateString(product.name, 50)}</a></p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg text-right">x{product.quantity}</p>
                                                        <p className="text-lg text-right">{formatPrice(product.finalPrice * product.quantity)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:flex sm:justify-between">
                                                <div className="flex items-center text-[#52c41a]"></div>
                                                <div className="mt-6 pt-4 flex items-center text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                                                    {(order.status === OrderStatus.COMPLETE && (product.isReviewed === false)) && (
                                                        <div className="flex-1 flex justify-center">
                                                            <a
                                                                href={"/review/" + product.orderDetailId}
                                                                className="text-indigo-600 whitespace-nowrap hover:text-soft-red"
                                                            >
                                                                Đánh giá sản phẩm {product.isReviewed}
                                                            </a>
                                                        </div>
                                                    )}
                                                    
                                                </div>
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                                <div className={`pt-4 pr-4 pl-4 flex ${order.orderDetails.length > 1 ? "justify-between" : "justify-end"}`}>
                                    {order.orderDetails.length > 1 && (
                                        // shadow-sm text-sm font-normal text-grey hover:bg-gray-50
                                        <button
                                            onClick={toggleExpand}
                                            className="flex items-center bg-soft-red text-white font-bold border !border-soft-red justify-center py-2 px-2.5 rounded-lg"
                                        >
                                            {isExpanded ? 'Ẩn bớt' : 'Xem thêm'}
                                        </button>
                                    )}                         
                                    <div className="text-gray-500 mr-3">
                                        <span className="text-sm">Tổng tiền (<span>{order.orderDetails.length}</span> sản phẩm): </span>
                                        <span className="text-lg text-bold">{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                                {(order.note && (order.status === OrderStatus.CANCEL || order.status === OrderStatus.DENIED)) && (
                                    <div className="flex items-center justify-left ml-6 py-2 px-2.5 rounded-md shadow-sm text-sm font-normal text-red">
                                        <b className='mr-2'>Lý do hủy: </b><span>{order.note}</span>
                                    </div>
                                )}
                                <div className="p-4 sm:flex sm:justify-between">
                                    {order.status === OrderStatus.PENDING && (
                                        <div className="flex items-center text-[#FCA510]">
                                            <CheckCircleFilled className="w-5 h-5 text-green-500" aria-hidden="true" />
                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                Đơn hàng được đặt vào <time dateTime={order.lastUpdated}>{order.lastUpdated}</time>
                                            </p>
                                        </div>
                                    )}
                                    {order.status === OrderStatus.COMPLETE && (
                                        <div className="flex items-center text-[#52c41a]">
                                            <CheckCircleFilled className="w-5 h-5 text-green-500" aria-hidden="true" />
                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                Giao hàng thành công vào <time dateTime={order.lastUpdated}>{order.lastUpdated}</time>
                                            </p>
                                        </div>
                                    )}
                                    {(order.status === OrderStatus.CANCEL || order.status === OrderStatus.DENIED) && (
                                        <div className="flex items-center text-[#FF0000]">
                                            <CheckCircleFilled className="w-5 h-5 text-green-500" aria-hidden="true" />
                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                Đơn hàng hủy vào <time dateTime={order.lastUpdated}>{order.lastUpdated}</time>
                                            </p>
                                        </div>
                                    )}
                                    {order.status === OrderStatus.PROCESSING && (
                                        <div className="flex items-center text-[#0000FF]">
                                            <CheckCircleFilled className="w-5 h-5 text-green-500" aria-hidden="true" />
                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                Đơn hàng xác nhận vào <time dateTime={order.lastUpdated}>{order.lastUpdated}</time>
                                            </p>
                                        </div>
                                    )}
                                    {order.status === OrderStatus.SHIPPING && (
                                        <div className="flex items-center text-[#00CCFF]">
                                            <CheckCircleFilled className="w-5 h-5 text-green-500" aria-hidden="true" />
                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                Đơn hàng đã được giao cho đơn vị vận chuyển vào <time dateTime={order.lastUpdated}>{order.lastUpdated}</time>
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex items-center text-[#52c41a]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    };

    return (
        <div>
            <Tabs defaultActiveKey="0" activeKey={selectedTab} items={items} onChange={handleTabChange} size='large' className="mt-6 ml-10" />
            <Pagination
                current={pageNo}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
                className="my-2 justify-end mr-6"
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                orders.length > 0 ?
                    <div className="bg-[#eeeeee]">
                        {renderOrders(orders)}
                    </div>
                    :
                    <NoOrderFound />
            )}
        </div>
    )
}
export default MyOrders;