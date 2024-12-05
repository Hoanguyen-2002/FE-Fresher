import {
  CarryOutFilled,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
  ReloadOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { OrderStatus } from "../../enum/OrderStatus";

export const orderStatus = {
  [OrderStatus.PENDING]: {
    icon: <ShoppingCartOutlined />,
    originIcon: <ShoppingCartOutlined />,
    label: "Đơn hàng mới",
    cssbg: "bg-custom-blue",
    csstext: "text-[#1677ff]",
  },
  [OrderStatus.PROCESSING]: {
    icon: <ShoppingOutlined />,
    originIcon: <ShoppingOutlined />,
    label: "Chờ lấy hàng",
    cssbg: "bg-custom-blue",
    csstext: "text-[#1677ff]",
  },
  [OrderStatus.SHIPPING]: {
    icon: <ReloadOutlined spin />,
    originIcon: <ReloadOutlined />,
    label: "Đang giao hàng",
    cssbg: "bg-custom-blue",
    csstext: "text-[#1677ff]",
  },
  [OrderStatus.COMPLETE]: {
    icon: <CarryOutFilled style={{ color: "#52c41a" }} />,
    originIcon: <CarryOutFilled />,
    label: "Đơn hoàn thành",
    cssbg: "bg-[#b7eb8f]",
    csstext: "text-[#52c41a]",
  },
  [OrderStatus.DENIED]: {
    icon: <ExclamationCircleOutlined color={"#FF0000"} />,
    originIcon: <ExclamationCircleOutlined />,
    label: "Đơn hủy",
    cssbg: "bg-custom-red",
    csstext: "text-[#FF0000]",
  },
  [OrderStatus.CANCEL]: {
    icon: <CloseCircleTwoTone twoToneColor={"#FF0000"} />,
    originIcon: <CloseCircleTwoTone />,
    label: "Đơn hủy",
    cssbg: "bg-custom-red",
    csstext: "text-[#FF0000]",
  },
  [OrderStatus.ALL]: {
    icon: <CloseCircleTwoTone twoToneColor={"#FF0000"} />,
    originIcon: <CloseCircleTwoTone />,
    label: "Đơn hủy",
    cssbg: "bg-custom-red",
    csstext: "text-[#FF0000]",
  },
};

export const renderOrderStatusTitle = (
  status?: OrderStatus
): React.ReactNode => {
  if (!status) return null;
  return (
    <div className={`${orderStatus[status].csstext}`}>
      {orderStatus[status].label}
    </div>
  );
};
