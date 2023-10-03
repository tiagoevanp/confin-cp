import { type PropsWithChildren, type FC, useContext } from 'react';
import BackdropContext from '../../contexts/ActionbarContext';
import './Backdrop.scss';
import { useClassName } from '../../hooks/useClassName';
import { useNavigate } from 'react-router-dom';
import { usePathResolver } from '../../hooks/usePathResolver';

const Backdrop: FC<PropsWithChildren> = ({ children }) => {
  const { hidden } = useContext(BackdropContext);
  const className = useClassName('backdrop', { hidden });
  const navigate = useNavigate();
  const { page } = usePathResolver();

  return (
    <div
      className={className}
      onClickCapture={(e) => {
        e.currentTarget === e.target && navigate(`/${page}`);
      }}
    >
      {children}
    </div>
  );
};

export default Backdrop;
