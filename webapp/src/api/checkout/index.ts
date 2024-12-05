import {
  TCheckoutBody,
  TCheckoutContent,
  TCheckoutReturn,
} from "../../types/checkout";
import { API_ROUTES } from "../../types/const";
import { TResponse } from "../../types/type";
import { httpRequest } from "../common";

export const checkout = async (
  data: TCheckoutBody
): Promise<TCheckoutReturn | null> => {
  try {
    const url = API_ROUTES.CHECKOUT;
    const response = await httpRequest<TResponse<TCheckoutContent>>(
      "POST",
      url,
      data
    );
    if (Array.isArray(response.data.content)) {
      return null;
    }
    return {
      result: response.code,
      itemResponseList: response.data.content.itemResponseList,
      orderId: response.data.content.orderId
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
