import { type PropsWithChildren, useMemo, useState, type FC } from 'react';
import ActionbarContext from '../contexts/ActionbarContext';

type ActionbarProviderProps = PropsWithChildren<{
  refetch: () => void;
}>;

const ActionbarProvider: FC<ActionbarProviderProps> = ({ refetch, children }) => {
  const [hidden, setHidden] = useState(true);

  const actionbarContextValue = useMemo(
    () => ({
      hidden,
      hide: () => {
        setHidden(true);
      },
      show: () => {
        setHidden(false);
      },
      reloadData: () => {
        refetch();
      },
    }),
    [hidden, refetch],
  );

  return (
    <ActionbarContext.Provider value={actionbarContextValue}>{children}</ActionbarContext.Provider>
  );
};

export default ActionbarProvider;
