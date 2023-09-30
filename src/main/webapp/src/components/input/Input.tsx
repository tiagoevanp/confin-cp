import { type HTMLAttributes, forwardRef, type ChangeEventHandler } from 'react';
import './Input.scss';
import Label from './Label';
import Hint from './Hint';

export type InputProps = {
  type: 'text' | 'number' | 'password' | 'email';
  name: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  hint?: string;
  style?: HTMLAttributes<HTMLDivElement>['style'];
  required?: boolean;
  hidden?: boolean;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, name, disabled, placeholder, label, hint, style, required, hidden, onChange, onBlur },
    ref,
  ) => {
    return (
      <div className='cp-input__wrapper' style={style}>
        <Label text={label} disabled={disabled} />
        <Hint text={hint} disabled={disabled} />
        <input
          ref={ref}
          type={type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className='cp-input'
          required={required}
          hidden={hidden}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
