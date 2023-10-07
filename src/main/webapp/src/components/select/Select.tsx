import { forwardRef, type ChangeEventHandler } from 'react';
import ReactSelect, { type SingleValue, type ActionMeta, type SelectInstance } from 'react-select';
import './Select.scss';
import Label from '../input/Label';
import Hint from '../input/Hint';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  name: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
  options: SelectOption[];
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onChange?: (value: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void;
  value?: SelectOption;
  required?: boolean;
};

const Select = forwardRef<SelectInstance<SelectOption>, SelectProps>(
  ({ label, hint, options, disabled, name, onBlur, onChange, required, value }, ref) => {
    return (
      <div>
        <Label text={label} disabled={disabled} required={required} />
        <Hint text={hint} disabled={disabled} />
        <ReactSelect
          options={options}
          noOptionsMessage={() => 'Sem opções'}
          isDisabled={disabled}
          placeholder='Selecione'
          classNamePrefix='cp-select'
          value={value}
          required={required}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
        />
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
