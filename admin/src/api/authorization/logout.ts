import { TRefreshTokenBody } from "../../types/auth";
import { API_ROUTES } from "../../types/const";
import { TResponse } from "../../types/type";
import { httpRequest } from "../common";

export const login = async (
  data: Partial<TRefreshTokenBody>
): Promise<TResponse<null> | null> => {
  try {
    const url = API_ROUTES.AUTH_API + "/login";
    return await httpRequest<TResponse<null>>("POST", url, data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
