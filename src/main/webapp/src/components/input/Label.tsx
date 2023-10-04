import { type FC } from 'react';
import { useClassName } from '../../hooks/useClassName';

type LabelProps = {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
};

const Label: FC<LabelProps> = ({ disabled, text, hidden, required }) => {
  const className = useClassName('cp-hint', {
    disabled,
  });

  if (text === undefined || text === null || text === '') {
    return null;
  }

  return (
    <label hidden={hidden} className={className}>
      <div className='cp-label--text'>
        {text}
        {(required ?? false) && <span className='cp-label--text__required'> *</span>}
      </div>
    </label>
  );
};

export default Label;
