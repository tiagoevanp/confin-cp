import { createContext } from 'react';

type BackdropContextValue = {
  hidden: boolean;
  setHidden: () => void;
};

const BackdropContext = createContext<BackdropContextValue>({
  hidden: true,
  setHidden: () => {},
});

export default BackdropContext;
