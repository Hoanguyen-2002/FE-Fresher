import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "../components/search/Search";
import OrderDetailComponent from "../components/order/OrderDetailComponent";
import { TOrder, TOrderItem } from "../types/order";
import { OrderStatus } from "../enum/OrderStatus";
import { ColumnsType } from "antd/es/table";
import { formatPrice } from "../utils/priceFormat";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { getOrderDetail } from "../api/order";

const OrderTrackingDetail = () => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();

  const cardTitleCss: React.CSSProperties = {
    fontSize: "16px",
    textAlign: "left",
    border: "none",
    minHeight: "0px",
    padding: "10px 24px",
  };

  const [data, setData] = useState<Partial<TOrder>>();
  const [isLoading, setIsLoading] = useState(true);

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
          <div className="text-[#C92127] font-bold text-xl">
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

  useEffect(() => {
    setIsLoading(true);
    fetchData()
  },[id]);

  const fetchData = async () => {
    try { 
      const data: TOrder | null = await getOrderDetail(id ?? "", "/v1/orders/guest/tracking")
      setIsLoading(false);
      !data || setData(data)
      data || navigate("/orderTracking", {
        state: {
          errorMessage: "Không tìm thấy đơn hàng có mã hợp lệ!"
        }
      })
    } catch (error) { 
      console.log("hui", error)
    } finally {
      setIsLoading(false)
    }
  };

  if(isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <div className="order-tracking-container py-8 bg-soft-red min-h-[80vh] w-full h-auto p-4 flex justify-center items-center">
      <div className="order-tracking-search xl:max-w-[1240px] w-[80%] flex flex-col">
        <div className="search">
          <div className="p-4">
            <Search
              placeholder="Nhập mã đơn hàng cần tra cứu"
              styleType="thin"
              placeholderColor="black"
              onSearch={(value) => {
                navigate("/orderTracking/" + value.trim());
              }}
            />
          </div>
          <OrderDetailComponent {...{data, columns}} />
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingDetail;
