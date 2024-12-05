import { TRegisterBody } from "../../types/auth";
import { API_ROUTES } from "../../types/const";
import { TResponse } from "../../types/type";
import { httpRequest } from "../common";

export const register = async (
  data: TRegisterBody
): Promise<TResponse<null> | null> => {
  try {
    const url = API_ROUTES.AUTH_API + "/register";
    return await httpRequest<TResponse<null>>("POST", url, data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
