import { type PropsWithChildren, type FC, useContext } from 'react';
import BackdropContext from '../../contexts/ActionbarContext';
import './Backdrop.scss';
import { useClassName } from '../../hooks/useClassName';

const Backdrop: FC<PropsWithChildren> = ({ children }) => {
  const { hidden, toggle } = useContext(BackdropContext);
  const className = useClassName('backdrop', { hidden });

  return (
    <div
      className={className}
      onClickCapture={(e) => {
        e.currentTarget === e.target && toggle();
      }}
    >
      {children}
    </div>
  );
};

export default Backdrop;
