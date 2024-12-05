import { TLoginResponse, TRefreshTokenBody } from "../../types/auth";
import { API_ROUTES } from "../../types/const";
import { httpRequest } from "../common";

export const refreshToken = async (
  data: TRefreshTokenBody
): Promise<TLoginResponse | null> => {
  try {
    const url = API_ROUTES.AUTH_API + "/login";
    return await httpRequest<TLoginResponse>("POST", url, data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
