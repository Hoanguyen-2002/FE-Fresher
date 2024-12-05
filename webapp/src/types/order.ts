import { OrderStatus } from "../enum/orderStatus";

export type TOrder = {
  orderId: string;
  orderDetails: Partial<TOrderItem>[];
  status: OrderStatus;
  recipient: string;
  phone: string;
  address: string;
  shippingMethod: string;
  shippingFee: number;
  paymentMethod: string;
  total: number;
  lastUpdated: string;
  createdAt: string;
  email: string;
  note: string;
};

export type TOrderItem = {
  orderDetailId: string;
  bookId: string;
  name: string;
  thumbnail: string;
  basePrice: number;
  discountPrice: number;
  finalPrice: number;
  quantity: number;
  totalPrice: number;
  isReviewed: boolean;
};
