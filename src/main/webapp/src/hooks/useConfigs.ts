import { useContext } from 'react';
import ConfigContext from '../contexts/ConfigContext';
import { type Business } from '../definitions/api/config/Business';

type useConfigReturn = Record<string, Omit<Business, 'id'>>;

export const useConfigs = (ids: Array<Business['id']>): useConfigReturn => {
  const { business } = useContext(ConfigContext);

  return business
    .filter((config: Business) => ids.includes(config.id))
    .reduce(
      (acc: Record<string, Omit<Business, 'id'>>, { id, ...config }: Business) => ({
        ...acc,
        [id]: config,
      }),
      {},
    );
};
