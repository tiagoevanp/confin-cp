import { type PropsWithChildren, type FC } from 'react';
import { createClassName } from '../helpers/createClassName';

type HintProps = PropsWithChildren<{
  text?: string;
  disabled?: boolean;
}>;

const Hint: FC<HintProps> = ({ text, children, disabled }) => {
  if (text === undefined || text === null || text === '') {
    return <>{children}</>;
  }

  const className = createClassName('cp-hint', {
    disabled,
  });

  return (
    <div className={className}>
      <div className='cp-hint--text'>{text}</div>
      {children}
    </div>
  );
};

export default Hint;
