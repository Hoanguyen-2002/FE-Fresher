import { TLoginBody, TLoginResponse } from "../../types/auth";
import { TResponse } from "../../types/type";
import { API_ROUTES } from "../../types/const";
import { httpRequest } from "../common";

export const login = async (
  data: TLoginBody
): Promise<TLoginResponse | null> => {
  try {
    const url = API_ROUTES.AUTH_API + "/login";
    const response = await httpRequest<TResponse<TLoginResponse>>(
      "POST",
      url,
      data
    );
    if (Array.isArray(response.data.content)) {
      return null;
    }
    return response.data.content;
  } catch (error) {
    console.log(error);
    return null;
  }
};
