import React from "react";
import { orderStatus } from "./OrderStatus";
import { OrderStatus } from "../../enum/orderStatus";

const OrderStatusTag = ({
  data,
}: {
  data: {
    status?: OrderStatus;
  };
}) => {
  return (
    <div
      className={`flex border items-center ${
        orderStatus[data.status ?? OrderStatus.PENDING].cssbg
      } ${
        orderStatus[data.status ?? OrderStatus.PENDING].csstext
      } text-[12px] px-[10px] py-0.5 h-6 leading-[22px] rounded-xl whitespace-nowrap cursor-default`}
      style={{ borderColor: "transparent" }}
    >
      {orderStatus[data.status ?? OrderStatus.PENDING].label}
    </div>
  );
};

export default OrderStatusTag;
