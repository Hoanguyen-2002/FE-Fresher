export type TCategoryListItem = {
  categoryId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

export type TCategoryParams = {
  pageNo: number;
  pageSize: number;
};
