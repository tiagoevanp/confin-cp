import axios, { type AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type UseAxiosReturn = { loading: boolean; request: AxiosResponse['data'] };

export const useAxios = (method: HttpMethod, url: string): UseAxiosReturn => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (data?: any) => {
      try {
        setLoading(true);

        const response = await axios({ method, url, data });

        return response.data;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [method, url],
  );

  return { loading, request };
};
