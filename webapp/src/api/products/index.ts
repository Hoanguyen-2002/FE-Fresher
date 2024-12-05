import { TSearchParams } from "../../types/search";
import { httpRequest } from "../common";
import { API_ROUTES } from "../../types/const";
import { TResponse } from "../../types/type";
import { TBook, TBookDetail, TBookListReturn } from "../../types/book";
import { TBookListReview, TBookReview } from "../../types/review";

const appendParam = (url: string, params: Partial<TSearchParams>): string => {
  const paramStr: string[] = [];
  if (params) {
    const keyList = Object.keys(params) as (keyof TSearchParams)[];
    keyList.forEach((key) => {
      if (key === "categories") {
        params[key]?.forEach((item) => {
          paramStr.push(key + "=" + item);
        });
      } else if (key === "sort") {
        params[key]?.forEach((item) => {
          paramStr.push(key + "=" + item.sortType + "_" + item.order);
        });
      } else {
        if (params[key] !== "" && params[key] !== null)
          paramStr.push(key + "=" + params[key]);
      }
    });
  }
  return url + "?" + paramStr.join("&");
};

export const getProductsList = async (
  params: Partial<TSearchParams>
): Promise<TBookListReturn | null> => {
  try {
    const url = appendParam(API_ROUTES.BOOK_LIST, params);
    const response = await httpRequest<TResponse<TBook>>("GET", url);
    if (Array.isArray(response.data.content)) {
      const returnData: TBookListReturn = {
        books: response.data.content,
        totalItems: response.data.metaData.totalElements,
      };
      return returnData;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getProductDetail = async (
  productId: string | undefined
): Promise<TBookDetail | null> => {
  try {
    const url = API_ROUTES.BOOK_DETAIL + `/${productId}`;
    const response = await httpRequest<TResponse<TBookDetail>>("GET", url);
    if (!Array.isArray(response.data.content)) {
      return null;
    }
    return response.data.content[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getTopSellerProductsList = async (
): Promise<TBookListReturn | null> => {
  try {
    const url = API_ROUTES.TOP_SELLER_BOOK_LIST;
    const response = await httpRequest<TResponse<TBook>>("GET", url);
    if (Array.isArray(response.data.content)) {
      const returnData: TBookListReturn = {
        books: response.data.content,
        totalItems: 10,
      };
      return returnData;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getProductReview = async (
  bookId: string | undefined
): Promise<TBookListReview | null> => {
  try {
    const url = API_ROUTES.BOOK_REVIEW + `/${bookId}`;
    const response = await httpRequest<TResponse<TBookReview>>("GET", url);
    if (Array.isArray(response.data.content)) {
      const returnData: TBookListReview = {
        reviews: response.data.content,
        totalItems: response.data.metaData.totalElements,
      };
      return returnData;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
