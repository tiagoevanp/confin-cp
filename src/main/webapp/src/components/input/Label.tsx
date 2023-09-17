import { type PropsWithChildren, type FC } from 'react';
import { createClassName } from '../helpers/createClassName';

type LabelProps = PropsWithChildren<{
  text?: string;
  disabled?: boolean;
}>;

const Label: FC<LabelProps> = ({ disabled, text, children }) => {
  if (text === undefined || text === null || text === '') {
    return <>{children}</>;
  }

  const className = createClassName('cp-hint', {
    disabled,
  });

  return (
    <label className={className}>
      <div className='cp-label--text'>{text}</div>
      {children}
    </label>
  );
};

export default Label;
