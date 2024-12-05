import { TSearchParams } from '../../types/search';
import { httpRequest } from '../common';
import { API_ROUTES } from '../../types/const';
import { TResponse } from '../../types/type';
import {
  TBook,
  TBookDetail,
  TBookListReturn,
  TCreateProductBody,
} from '../../types/book';

const appendParam = (url: string, params: Partial<TSearchParams>): string => {
  const paramStr: string[] = [];
  if (params) {
    const keyList = Object.keys(params) as (keyof TSearchParams)[];
    keyList.forEach((key) => {
      if (key === 'categories') {
        params[key]?.forEach((item) => {
          paramStr.push(key + '=' + item);
        });
      } else if (key === 'sort') {
        params[key]?.forEach((item) => {
          paramStr.push(key + '=' + item.sortType + '_' + item.order);
        });
      } else {
        if (params[key] !== '' && params[key] !== null)
          paramStr.push(key + '=' + params[key]);
      }
    });
  }
  return url + '?' + paramStr.join('&');
};

export const getProductsList = async (
  params: Partial<TSearchParams>
): Promise<TBookListReturn> => {
  try {
    const url = appendParam(API_ROUTES.BOOK_LIST, params);
    const response = await httpRequest<TResponse<TBook>>('GET', url);
    if (Array.isArray(response.data.content)) {
      const returnData: TBookListReturn = {
        books: response.data.content,
        totalItems: response.data.metaData.totalElements,
        msg: 'Success',
      };
      return returnData;
    }
    return {
      books: [],
      totalItems: response.data.metaData.totalElements,
      msg: 'Success',
    };
  } catch (err) {
    console.log(err);
    return {
      books: [],
      totalItems: 0,
      msg: err,
    };
  }
};

export const getProductDetail = async (
  productId: string | undefined
): Promise<TBookDetail | null> => {
  try {
    const url = API_ROUTES.BOOK_DETAIL + `/${productId}`;
    const response = await httpRequest<TResponse<TBookDetail>>('GET', url);
    if (!Array.isArray(response.data.content)) {
      return null;
    }
    return response.data.content[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createProduct = async (
  data: TCreateProductBody
): Promise<string | null> => {
  try {
    const url = API_ROUTES.CREATE_BOOK;
    const response = await httpRequest<TResponse<null>>('POST', url, data);
    return response.msg;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateProduct = async (
  bookId: string,
  data: TCreateProductBody
): Promise<string | null> => {
  try {
    console.log(bookId);
    const url = API_ROUTES.UPDATE_BOOK + `/${bookId}`;
    const response = await httpRequest<TResponse<null>>('PUT', url, data);
    return response.msg;
  } catch (err) {
    console.log(err);
    return null;
  }
};
