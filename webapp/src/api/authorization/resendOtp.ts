import { API_ROUTES } from "../../types/const";
import { TResponse } from "../../types/type";
import { httpRequest } from "../common";

export const resendOtp = async (
  email: string
): Promise<TResponse<null> | null> => {
  try {
    const url = API_ROUTES.AUTH_API + `/resendOtp?email=${email}`;
    return await httpRequest<TResponse<null>>("POST", url);
  } catch (error) {
    console.log(error);
    return null;
  }
};
