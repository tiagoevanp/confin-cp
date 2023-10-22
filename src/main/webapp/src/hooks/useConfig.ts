import { useContext } from 'react';
import ConfigContext from '../contexts/ConfigContext';
import { type Business } from '../definitions/api/config/Business';

type useConfigReturn = Business | undefined;

export const useConfig = (id: Business['id']): useConfigReturn => {
  const { business } = useContext(ConfigContext);

  return business.find((config: Business) => config.id === id);
};
