import { useCallback, useEffect, useState } from 'react';
import { useAxios } from './useAxios';

// TODO: adjust any type
type UseDataFetchReturn = { loading: boolean; data: any[]; refetch: () => void };

export const useDataFetch = (url: string): UseDataFetchReturn => {
  const [data, setData] = useState([] as any[]);

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
