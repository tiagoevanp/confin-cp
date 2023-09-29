import { type HTMLAttributes, type FC } from 'react';
import './Input.scss';
import Label from './Label';
import Hint from './Hint';

type InputProps = {
  type: 'text' | 'number' | 'password';
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  hint?: string;
  style?: HTMLAttributes<HTMLDivElement>['style'];
};

const Input: FC<InputProps> = ({ type, disabled, placeholder, label, hint, style }) => {
  return (
    <div className='cp-input__wrapper' style={style}>
      <Label text={label} disabled={disabled} />
      <Hint text={hint} disabled={disabled} />
      <input type={type} disabled={disabled} placeholder={placeholder} className='cp-input' />
    </div>
  );
};

export default Input;
