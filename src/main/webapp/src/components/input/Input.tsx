import { type FC } from 'react';
import './Input.scss';
import Label from './Label';
import Hint from './Hint';

type InputProps = {
  type: 'text' | 'number' | 'password';
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  hint?: string;
};

const Input: FC<InputProps> = ({ type, disabled, placeholder, label, hint }) => {
  return (
    <Label text={label} disabled={disabled}>
      <Hint text={hint} disabled={disabled}>
        <input type={type} disabled={disabled} placeholder={placeholder} className='cp-input' />
      </Hint>
    </Label>
  );
};

export default Input;
