import { TOrder } from "../../types/order";
import { TResponse } from "../../types/type";
import { httpRequest } from "../common";


export const getOrderDetail = async (
    orderId: string,
    api: string
  ): Promise<TOrder | null> => {
    try {
      const url = api + `/${orderId}`;
      const response = await httpRequest<TResponse<TOrder>>("GET", url);
      if (!Array.isArray(response.data.content)) {
        return response.data.content;
      } else {
        return response.data.content[0];
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  export const cancelOrder = async (
    reason: string,
    orderId: string | undefined
  ): Promise<string | null> => {
    try {
      const response = await httpRequest<TResponse<null>>("PUT", `/v1/accounts/myOrders/${orderId}`, {message: reason});
      return response.msg;
    } catch (err) {
      console.log(err);
      return null;
    }
  };