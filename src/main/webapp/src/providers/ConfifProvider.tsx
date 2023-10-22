import { type PropsWithChildren, type FC, useMemo } from 'react';
import ConfigContext from '../contexts/ConfigContext';
import { useDataFetch } from '../hooks/useDataFetch';
import { type Business } from '../definitions/api/config/Business';

type ConfigProviderProps = PropsWithChildren;

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const { data: business } = useDataFetch<Business>('config/business');

  const configs = useMemo(
    () => ({
      business,
    }),
    [business],
  );

  return <ConfigContext.Provider value={configs}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
