import React from "react";
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  const continueBuy = () => {
    navigate("/");
  };
  const viewOrderDetail = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate(`/profile/myOrders/orderDetail/${orderId}`);
    } else {
      navigate(`/orderTracking/${orderId}`);
    }
  };
  return (
    <div className="bg-[#f3f4f6] m-auto w-full h-[68vh] flex">
      <div className=" justify-center bg-[#f3f4f6] flex w-full items-center">
        <div className="bg-white shadow-md rounded-md p-8 text-center max-w-lg">
          <CheckCircleOutlined className="text-[#22c55e] text-7xl mb-4" />

          <h1 className="text-2xl font-semibold text-[#22c55e]">
            Đơn hàng của bạn đã được tiếp nhận
          </h1>

          <p className="text-gray-600 mt-4">
            Cảm ơn bạn đã mua hàng tại h3mdt.com
          </p>
          <p className="text-gray-600">
            Mã đơn hàng của bạn là:{" "}
            <span className="text-blue-500 font-medium">{orderId}</span>
          </p>
          <p className="text-gray-600">
            Bạn sẽ sớm nhận được email xác nhận đơn hàng từ chúng tôi.
          </p>

          <div className="flex  flex-col sm:flex-row gap-4 mt-6">
            <Button
              type="primary"
              className="bg-[#f43f5e] hover:border-[#e11d48] border-none px-6 py-2 font-bold"
              onClick={continueBuy}
            >
              TIẾP TỤC MUA SẮM
            </Button>
            <Button
              type="default"
              className="border-[#e11d48] text-[#f43f5e] px-4 py-2 hover:border-[#e11d48] hover:text-[#e11d48] font-bold"
              onClick={viewOrderDetail}
            >
              XEM CHI TIẾT ĐƠN HÀNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
