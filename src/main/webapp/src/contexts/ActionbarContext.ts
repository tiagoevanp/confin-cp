import { createContext } from 'react';

type ActionbarContextValue = {
  hidden: boolean;
  toggle: () => void;
  setRow: (value: any) => void;
};

const ActionbarContext = createContext<ActionbarContextValue>({
  hidden: true,
  toggle: () => {},
  setRow: () => {},
});

export default ActionbarContext;
