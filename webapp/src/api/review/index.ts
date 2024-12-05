import { API_ROUTES } from "../../types/const";
import { TCreateReview } from "../../types/review";
import { TResponse } from "../../types/type";
import { httpRequest } from "../common";

export const createReview = async (
  data: TCreateReview,
  params: string | undefined
): Promise<string | null> => {
  try {
    const url = API_ROUTES.ODER_REVIEW + "?orderDetailId=" + params;
    const response = await httpRequest<TResponse<null>>("POST", url, data);
    return response.msg;
  } catch (err) {
    console.log(err);
    return null;
  }
};
