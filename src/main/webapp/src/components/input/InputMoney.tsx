import { forwardRef } from 'react';
import Input, { type InputProps } from './Input';
import { useMoneyMask } from '../../hooks/useMoneyMask';

type InputMoneyProps = Omit<InputProps, 'type'>;

const InputMoney = forwardRef<HTMLInputElement, InputMoneyProps>(
  ({ onChange, value, name, onBlur, disabled, label, required }, ref) => {
    const moneyMask = useMoneyMask();

    return (
      <Input
        onChange={(e) => {
          onChange(moneyMask(e.target.value));
        }}
        type='number'
        value={value}
        name={name}
        onBlur={onBlur}
        label={label}
        required={required}
        disabled={disabled}
        ref={ref}
      />
    );
  },
);

InputMoney.displayName = 'InputMoney';

export default InputMoney;
