import { TAccountParams, TListAccountItem } from "../../types/account";
import { API_ROUTES } from "../../types/const";
import { TResponse } from "../../types/type";
import { httpRequest } from "../common";

const appendParam = (url: string, params: Partial<TAccountParams>): string => {
  if (params) {
    url += "?";
    let check = false;
    for (const [key, value] of Object.entries(params)) {
      if (!check) {
        url += `${key}=${value}`;
      } else {
        url += `&${key}=${value}`;
        check = true;
      }
    }
    return url;
  }
  return url;
};

export const getAccountList = async (
  params: TAccountParams
): Promise<TListAccountItem[] | null> => {
  try {
    const url = appendParam(API_ROUTES.CATEGORY, params);
    const response = await httpRequest<TResponse<TListAccountItem>>("GET", url);
    if (Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAccountDetail = async (
  accountId: string
): Promise<TListAccountItem | null> => {
  try {
    const url = API_ROUTES.ACCOUNT + `/${accountId}`;
    const response = await httpRequest<TResponse<TListAccountItem>>("GET", url);
    if (!Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const searchAccount = async (
  params: TAccountParams,
  keyword: string
): Promise<TListAccountItem | null> => {
  try {
    const url = appendParam(
      API_ROUTES.ACCOUNT + `/search?keyword=${keyword}&`,
      params
    );
    const response = await httpRequest<TResponse<TListAccountItem>>("GET", url);
    if (!Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
