import { createContext } from 'react';

type ActionbarContextValue = {
  hidden: boolean;
  hide: () => void;
  show: () => void;
  reloadData: () => void;
};

const ActionbarContext = createContext<ActionbarContextValue>({
  hidden: true,
  hide: () => {},
  show: () => {},
  reloadData: () => {},
});

export default ActionbarContext;
