import { useContext, type FC, type ReactElement } from 'react';
import './Actionbar.scss';
import Button from '../button/Button';
import { useClassName } from '../../hooks/useClassName';
import BackdropContext from '../../contexts/ActionbarContext';

type ActionbarProps = {
  title: string;
  content: ReactElement;
};

const Actionbar: FC<ActionbarProps> = ({ title, content }) => {
  const { hidden, toggle } = useContext(BackdropContext);
  const className = useClassName('actionbar__content', { close: hidden });
  const buttonClassName = useClassName('actionbar__button', { close: hidden });

  return (
    <aside className='actionbar'>
      <div className={buttonClassName}>
        <Button
          ghost
          square
          name='close'
          variant='white'
          onClick={() => {
            toggle();
          }}
        />
      </div>
      <div className={className}>
        <div className='actionbar__content__header'>{title}</div>
        {content}
      </div>
    </aside>
  );
};

export default Actionbar;
