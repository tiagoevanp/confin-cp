import { useCallback, useEffect, useState } from 'react';
import { useAxios } from './useAxios';

// TODO: adjust any type
type UseDataFetchReturn<T> = { loading: boolean; data: T[]; refetch: () => void };

export const useDataFetch = <T>(url: string): UseDataFetchReturn<T> => {
  const [data, setData] = useState([] as T[]);

  const { loading, request } = useAxios('GET', url);

  const fetchData = useCallback(async (): Promise<void> => {
    const response = await request();

    setData(response?.payload);
  }, [request]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { loading, data, refetch: fetchData };
};
