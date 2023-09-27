import { type PropsWithChildren, type FC, useMemo } from 'react';
import BackdropContext from '../../contexts/BackdropContext';
import './Backdrop.scss';
import { useToggle } from '../../hooks/useToggle';
import { useClassName } from '../../hooks/useClassName';

const Backdrop: FC<PropsWithChildren> = ({ children }) => {
  const [hidden, setHidden] = useToggle(true);
  const className = useClassName('backdrop', { hidden });
  const contextValue = useMemo(
    () => ({
      hidden,
      setHidden,
    }),
    [hidden, setHidden],
  );

  return (
    <BackdropContext.Provider value={contextValue}>
      <div
        className={className}
        onClick={() => {
          setHidden();
        }}
      >
        {children}
      </div>
    </BackdropContext.Provider>
  );
};

export default Backdrop;
