import { TCartItem } from "./cart";

export type TCheckoutBody = {
  itemList: TItemList[];
};

export type TItemList = {
  bookId: string;
  quantity: number;
  originalPrice: number;
  salePrice: number;
};

export type TCheckoutReturn = {
  result: number;
  itemResponseList: TCartItem[];
  orderId: string;
};

export type TCheckoutContent = {
  itemResponseList: TCartItem[];
  orderId: string;
};
