import { createContext } from 'react';
import { type Business } from '../definitions/api/config/Business';

type ConfigContextValue = {
  business: Business[];
};

const ConfigContext = createContext<ConfigContextValue>({
  business: [],
});

export default ConfigContext;
