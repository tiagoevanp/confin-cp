import { useState, type FC } from 'react';
import { useClassName } from '../../hooks/useClassName';
import './Callout.scss';
import Icon from '../icon/Icon';
import CalloutClose from './CalloutClose';

export type CalloutProps = {
  type: 'success' | 'warning' | 'danger';
  message: string;
};

const Callout: FC<CalloutProps> = ({ type, message }) => {
  const [hide, setHide] = useState(false);
  const className = useClassName('callout', { type, hide });

  return (
    <div className={className}>
      <div className='callout__innerContent'>
        <Icon name={type} variant={type} />
        <div className='callout__innerContent__text'>{message}</div>
      </div>
      <CalloutClose
        type={type}
        onClick={() => {
          setHide(true);
        }}
      />
    </div>
  );
};

export default Callout;
