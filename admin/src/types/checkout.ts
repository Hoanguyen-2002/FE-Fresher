export type TCheckoutBody = {
  itemList: TItemList[];
};

export type TItemList = {
  bookId: string;
  quantity: number;
  originalPrice: number;
  salePrice: number;
};
