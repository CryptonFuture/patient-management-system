// api/axiosBaseQuery.ts
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { instance } from '../../Axios/axiosConfig';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      data?: any;
      params?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'GET', data, params }) => {
    try {
      const result = await instance({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };