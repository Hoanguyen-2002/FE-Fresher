import { Steps } from "antd";
import { OrderStatus } from "../../enum/orderStatus";
import { orderStatus } from "./OrderStatus";
import { StepProps } from "antd/lib";

const renderOrderStatusTitle = (data: {
  status?: OrderStatus;
  isStatus: OrderStatus;
}) => {
  return (
    <div
      className={`${
        data.status === data.isStatus ? orderStatus[data.status].csstext : ""
      }`}
    >
      {orderStatus[data.isStatus].label}
    </div>
  );
};

const renderOrderStatusIcon = (data: {
  status?: OrderStatus;
  isStatus: OrderStatus;
}) => {
  if (data.status !== undefined && data.status !== data.isStatus)
    return orderStatus[data.isStatus].originIcon;
  return orderStatus[data.status ?? OrderStatus.PENDING].icon;
};

const OrderStatusTracking = ({
  data,
}: {
  data: {
    status?: OrderStatus;
  };
}) => {
  const steps: StepProps[] = [
    {
      title: renderOrderStatusTitle({
        status: data.status,
        isStatus: OrderStatus.PENDING,
      }),
      status: data.status === OrderStatus.PENDING ? "finish" : "wait",
      icon: renderOrderStatusIcon({
        status: data.status,
        isStatus: OrderStatus.PENDING,
      }),
    },
    {
      title: renderOrderStatusTitle({
        status: data.status,
        isStatus: OrderStatus.PROCESSING,
      }),
      status: data.status === OrderStatus.PROCESSING ? "finish" : "wait",
      icon: renderOrderStatusIcon({
        status: data.status,
        isStatus: OrderStatus.PROCESSING,
      }),
    },
    {
      title: renderOrderStatusTitle({
        status: data.status,
        isStatus: OrderStatus.SHIPPING,
      }),
      status: data.status === OrderStatus.SHIPPING ? "finish" : "wait",
      icon: renderOrderStatusIcon({
        status: data.status,
        isStatus: OrderStatus.SHIPPING,
      }),
    },
    {
      title: renderOrderStatusTitle({
        status: data.status,
        isStatus: OrderStatus.COMPLETE,
      }),
      status: data.status === OrderStatus.COMPLETE ? "finish" : "wait",
      icon: renderOrderStatusIcon({
        status: data.status,
        isStatus: OrderStatus.COMPLETE,
      }),
    },
  ];

  if (
    data.status === OrderStatus.CANCEL ||
    data.status === OrderStatus.DENIED
  ) {
    steps.push({
      title: renderOrderStatusTitle({
        status: data.status,
        isStatus: data.status,
      }),
      status: "error",
      icon: renderOrderStatusIcon({
        status: data.status,
        isStatus: data.status,
      }),
    });
  }

  return (
    <div
      className={`order-view-status-container ${
        orderStatus[data.status ?? OrderStatus.DENIED].cssbg
      } h-auto py-[10px] p-6 mb-[20px] rounded-lg m-auto`}
    >
      <Steps items={steps} />
    </div>
  );
};

export default OrderStatusTracking;
