import {
  CheckCircleOutlined,
  ShoppingCartOutlined,
  CarryOutFilled,
  ShoppingOutlined,
  ReloadOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { useState } from "react"

interface OrderStatusStepProps {
    status: string
}

const icons = [
  {
    status: "PENDING",
    icon: <ShoppingCartOutlined />,
  },
  {
    status: "PROCESSING",
    icon: <ShoppingOutlined />,
  },
  {
    status: "SHIPPING",
    icon: <ReloadOutlined spin />,
  },
  {
    status: "COMPLETE",
    icon: <CarryOutFilled />,
  },
  {
    status: "CANCEL",
    icon: <CloseCircleTwoTone twoToneColor="#FF0000" />,
  },
  {
    status: "DENIED",
    icon: <CloseCircleTwoTone twoToneColor="#FF0000" />,
  },
];

const renderIcon: any = (status: string) => {
    const target =  icons.filter((item) => item.status === status)
    return target[0].icon
}   

const OrderStatusStep = (props : OrderStatusStepProps) => {
  return (
    renderIcon(props.status)
  );
};

export default OrderStatusStep;
