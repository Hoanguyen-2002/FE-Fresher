import Search from "../components/search/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useEffect } from "react"

const OrderTracking = () => {
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const errorMessage = location.state?.errorMessage;
  useEffect(() => {
    if(errorMessage) {
      notification["error"]({
        message: "Mã không hợp lệ",
        description: errorMessage,
      });
    }
  }, [errorMessage]);

  return (
    <>
      <div className="order-tracking-container py-8 bg-soft-red min-h-[90vh] w-full h-auto p-4 flex justify-center items-center">
        <div className="order-tracking-search xl:max-w-[1240px] w-[40%] flex flex-col">
          <div className="logo flex flex-col">
            <div className="logo-image">
              <img
                className="min-h-[100px]"
                src="../../src/assets/logo.svg"
                alt=""
              />
            </div>
            <p className="mt-2 mb-8 text-3xl md:mb-16 lg:mt-4 font-bold text-center text-white">
              Tra cứu đơn hàng chỉ với 1 chạm!
            </p>
          </div>
          <div className="search">
            <Search
              placeholder="Nhập mã đơn hàng cần tra cứu"
              styleType="thin"
              placeholderColor="black"
              onSearch={(value) => {
                navigate("/orderTracking/" + value.trim());
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTracking;
