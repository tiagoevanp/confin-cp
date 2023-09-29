import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';

// TODO: adjust any type
type UseDataFetchReturn = { loading: boolean; data: any[] };

export const useDataFetch = (url: string): UseDataFetchReturn => {
  const [data, setData] = useState([] as any[]);

  const { loading, request } = useAxios('GET', url);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await request();

      setData(response?.payload);
    };

    void fetchData();
  }, [request]);

  return { loading, data };
};
