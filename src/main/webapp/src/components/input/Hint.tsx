import { type PropsWithChildren, type FC } from 'react';
import { useClassName } from '../../hooks/useClassName';

type HintProps = PropsWithChildren<{
  text?: string;
  disabled?: boolean;
}>;

const Hint: FC<HintProps> = ({ text, children, disabled }) => {
  const className = useClassName('cp-hint', {
    disabled,
  });

  if (text === undefined || text === null || text === '') {
    return null;
  }

  return (
    <div className={className}>
      <div className='cp-hint--text'>{text}</div>
    </div>
  );
};

export default Hint;
