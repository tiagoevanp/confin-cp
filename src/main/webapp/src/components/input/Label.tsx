import { type PropsWithChildren, type FC } from 'react';
import { useClassName } from '../../hooks/useClassName';

type LabelProps = PropsWithChildren<{
  text?: string;
  disabled?: boolean;
}>;

const Label: FC<LabelProps> = ({ disabled, text, children }) => {
  const className = useClassName('cp-hint', {
    disabled,
  });

  if (text === undefined || text === null || text === '') {
    return null;
  }

  return (
    <label className={className}>
      <div className='cp-label--text'>{text}</div>
    </label>
  );
};

export default Label;
