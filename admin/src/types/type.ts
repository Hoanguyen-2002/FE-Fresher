export interface TResponse<T> {
  code: number;
  msg: string;
  data: TResponseData<T>;
};

export type TResponseData<T> = {
  metaData: TMetaData;
  content: T[] | T;
};

export type TMetaData = {
  totalElements: number;
  limit: number;
  offset: number;
};

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
