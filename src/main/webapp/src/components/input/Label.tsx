import { type FC } from 'react';
import { useClassName } from '../../hooks/useClassName';

type LabelProps = {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
};

const Label: FC<LabelProps> = ({ disabled, text, hidden }) => {
  const className = useClassName('cp-hint', {
    disabled,
  });

  if (text === undefined || text === null || text === '') {
    return null;
  }

  return (
    <label hidden={hidden} className={className}>
      <div className='cp-label--text'>{text}</div>
    </label>
  );
};

export default Label;
