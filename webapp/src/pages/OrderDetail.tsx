import { Card } from "antd";
import { useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { formatPrice, getPrice } from "../utils/priceFormat";
import { TOrder, TOrderItem } from "../types/order";
import OrderStatusTag from "../components/order/OrderStatusTag";
import OrderDetailView from "../components/order/OrderDetailView";
import { formatId } from "../utils/populate";
import { OrderStatus } from "../enum/OrderStatus";
import { cancelOrder, getOrderDetail } from "../api/order";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import CancelOrderButton from "../components/button/CancelOrderButton";
import { ORDER_CANCEL_REASONS } from "../types/const";
import { notification } from "antd";
import { NotificationType } from "../types/type";

interface IState {
  type: NotificationType;
  message: string;
}

const cardTitleCss: React.CSSProperties = {
  fontSize: "16px",
  textAlign: "left",
  border: "none",
  minHeight: "0px",
  padding: "10px 24px",
};

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [data, setData] = useState<Partial<TOrder>>();
  const [isLoading, setIsLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const columns: ColumnsType<Partial<TOrderItem>> = [
    {
      title: `Sản phẩm (${data?.orderDetails?.length})`,
      dataIndex: "name",
      key: "name",
      render: (_, record: any) => (
        <div className="flex flex-row items-center sm:gap-4">
          <div className="">
            <img
              src={record.thumbnail}
              alt={record.name}
              className="w-16 h-16 object-contain rounded"
            />
          </div>
          <div className="flex justify-start">
            <span className="font-bold align-top max-w-[400px] line-clamp-1">
              {record.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: (_, record: any) => (
        <div className="text-center">
          <div className="line-through text-right text-[12px] text-grey">
            {formatPrice(record.basePrice)}
          </div>
          <div className="text-soft-red font-bold text-xl">
            {formatPrice(record.finalPrice)}
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (_, record: any) => (
        <div className="text-center">{record.quantity}</div>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, record: any) => (
        <div className="!text-center font-bold align-top">
          {formatPrice(record.totalPrice)}
        </div>
      ),
    },
  ];

  if (data?.status === OrderStatus.COMPLETE) {
    columns.push({
      title: "Hành động",
      dataIndex: "isReviewed",
      key: "isReviewed",
      render: (_, record) =>
        !record.isReviewed ? (
          <Button
            type="primary"
            size="small"
            className="text-center"
            onClick={() => navigate(`/review/${record.orderDetailId}`)}
          >
            Đánh giá
          </Button>
        ) : (
          <span className="text-green-500 text-center">Đã đánh giá</span>
        ),
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (reason: string, orderId: string) => {
    try {
      const data: string | null = await cancelOrder(reason, orderId ?? "");
      if (!data) {
        notification.error({
          message: "Lỗi!",
          description: "Hủy đơn hàng thất bại",
        });
      } else {
        notification.success({
          message: "Thành công!",
          description: data,
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const data: TOrder | null = await getOrderDetail(
        orderId ?? "",
        "/v1/orders/tracking"
      );
      setIsLoading(false);
      !data || setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="min-h-[100vh] bg-[#eeeeee] ">
        <div className="sticky top-0 h-auto p-4">
          <div className="normal-information bg-white shadow-lg rounded-lg overflow-hidden mx-auto p-5 mb-5">
            {/* normal information */}
            <div className="title h-7 lg:flex hidden lg:visible items-center justify-between mb-6">
              <div className="title-left flex lg:justify-start lg:flex:row flex:col h-full ">
                <div className="order-code text-xl font-bold h-[24px] mr-[15px]">
                  Mã đơn hàng #{formatId(data?.orderId)}
                </div>
                <OrderStatusTag data={{ status: data?.status }} />
              </div>
              <div className="w-80 text-end font-sans text-[1rem]">
                Ngày mua: {data?.createdAt}
              </div>
            </div>

            {/* bil information */}
            <div className="bill-information-container grid lg:grid-cols-8 grid-cols-1 gap-4 h-auto">
              <Card
                title="Thông tin người nhận"
                styles={{ header: cardTitleCss, body: { paddingTop: "0px" } }}
                className="shadow-xl lg:col-span-3"
                bordered={true}
              >
                <p className="text-left">{data?.recipient}</p>
                <p className="text-left">Tel: {data?.phone}</p>
                <p className="text-left flex gap-1">
                  <HomeOutlined style={{ color: "blue" }} />
                  {data?.address}
                </p>
              </Card>
              <Card
                title="Phương thức thanh toán"
                styles={{ header: cardTitleCss, body: { paddingTop: "0px" } }}
                className="shadow-xl lg:col-span-2"
                bordered={true}
              >
                <p className="text-left">{data?.paymentMethod}</p>
              </Card>
              <Card
                title="Tổng tiền"
                styles={{ header: cardTitleCss, body: { paddingTop: "0px" } }}
                className="shadow-xl lg:col-span-3"
                bordered={true}
              >
                <div className="flex justify-between">
                  <div>Tạm tính:</div>
                  <div>
                    {formatPrice(
                      getPrice(data?.total) - getPrice(data?.shippingFee)
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Phí vận chuyển:</div>
                  <div>{formatPrice(data?.shippingFee ?? 0)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-bold font-[12px]">Tổng Số Tiền:</div>
                  <div className="font-bold font-[12px] text-soft-red">
                    {formatPrice(data?.total ?? 0)}
                  </div>
                </div>
              </Card>
            </div>
            <div
              className={`!leading-none flex justify-end mt-6 ${
                data?.status === OrderStatus.PENDING
                  ? "visible"
                  : "hidden"
              }`}
            >
              <CancelOrderButton
                {...{
                  onConfirm: handleCancel,
                  reasons: ORDER_CANCEL_REASONS,
                  orderId: data?.orderId ?? "",
                  className:
                    "py-2 px-4 w-[20%] overflow-hidden text-soft-red border-1 border-soft-red hover:none",
                }}
              />
            </div>
          </div>

          <div className="bill flex flex-col lg:flex-row gap-4 mb-5">
            <Card
              title="Phương thức vận chuyển"
              styles={{ header: cardTitleCss, body: { paddingTop: "0px" } }}
              className="shadow-xl col-span-3 lg:w-[50%]"
              bordered={true}
            >
              <div className="text-left">{data?.shippingMethod}</div>
            </Card>
            <Card
              title="Ghi chú"
              styles={{ header: cardTitleCss, body: { paddingTop: "0px" } }}
              className="shadow-xl col-span-3 lg:w-[50%]"
              bordered={true}
            >
              <div className="text-left">
                {data?.note === undefined ? "(Không có)" : data.note}
              </div>
            </Card>
          </div>

          {/* order detail */}
          <OrderDetailView {...{ data: data, columns: columns }} />
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
