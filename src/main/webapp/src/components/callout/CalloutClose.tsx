import { type FC } from 'react';
import { type CalloutProps } from './Callout';
import { useClassName } from '../../hooks/useClassName';
import Button from '../button/Button';

type CalloutCloseProps = {
  onClick: () => void;
  type: CalloutProps['type'];
};

const CalloutClose: FC<CalloutCloseProps> = ({ onClick, type }) => {
  const closeClassName = useClassName('callout-close', { type });

  return (
    <div className={closeClassName}>
      <Button square ghost variant='white' name='edit' onClick={onClick} />
    </div>
  );
};

export default CalloutClose;
