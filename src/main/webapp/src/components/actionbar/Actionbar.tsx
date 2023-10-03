import { useContext, type FC, useEffect } from 'react';
import './Actionbar.scss';
import Button from '../button/Button';
import { useClassName } from '../../hooks/useClassName';
import BackdropContext from '../../contexts/ActionbarContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { usePathResolver } from '../../hooks/usePathResolver';

const Actionbar: FC = () => {
  const { hidden, hide, show } = useContext(BackdropContext);
  const className = useClassName('actionbar__content', { close: hidden });
  const buttonClassName = useClassName('actionbar__button', { close: hidden });
  const { page, action } = usePathResolver();
  const navigate = useNavigate();

  useEffect(() => {
    if (action === 'add' || action === 'edit') {
      show();
    } else {
      hide();
    }
  });

  return (
    <aside className='actionbar'>
      <div className={buttonClassName}>
        <Button
          ghost
          square
          name='close'
          variant='white'
          onClick={() => {
            if (action === 'add' || action === 'edit') {
              navigate(`/${page}`);
            } else {
              navigate('./add');
            }
          }}
        />
      </div>
      <div className={className}>
        <Outlet />
      </div>
    </aside>
  );
};

export default Actionbar;
