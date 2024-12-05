import { Card } from "antd";
import { TOrder, TOrderItem } from "../../types/order";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { formatPrice, getPrice } from "../../utils/priceFormat";
import OrderStatusTag from "./OrderStatusTag";
import OrderDetailView from "./OrderDetailView";
import { formatId } from "../../utils/populate";
import { ColumnsType } from "antd/es/table";

const cardTitleCss: React.CSSProperties = {
  fontSize: "16px",
  textAlign: "left",
  border: "none",
  minHeight: "0px",
  padding: "10px 24px",
};

const OrderDetailComponent = ({
  data,
  columns,
}: {
  data?: Partial<TOrder>;
  columns: ColumnsType<Partial<TOrderItem>>;
}) => {
  return (
    <div className="xl:max-w-[1240px] h-auto p-4 mx-auto">
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
              <div className="font-bold font-[12px] text-red">
                {formatPrice(data?.total ?? 0)}
              </div>
            </div>
          </Card>
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
      <OrderDetailView {...{ data, columns }} />
    </div>
  );
};

export default OrderDetailComponent;
