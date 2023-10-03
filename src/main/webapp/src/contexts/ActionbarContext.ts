import { createContext } from 'react';

type ActionbarContextValue = {
  hidden: boolean;
  hide: () => void;
  show: () => void;
};

const ActionbarContext = createContext<ActionbarContextValue>({
  hidden: true,
  hide: () => {},
  show: () => {},
});

export default ActionbarContext;
