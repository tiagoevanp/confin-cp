import { forwardRef, type ChangeEventHandler } from 'react';
import ReactSelect, {
  type SingleValue,
  type ActionMeta,
  type SelectInstance,
  type MultiValue,
} from 'react-select';
import './Select.scss';
import Label from '../input/Label';
import Hint from '../input/Hint';
import { type SelectOption } from './Select';

type SelectMultipleProps = {
  name: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
  options: SelectOption[];
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onChange?: (
    value: MultiValue<SelectOption> | SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
  value?: SelectOption[];
  required?: boolean;
};

const SelectMultiple = forwardRef<SelectInstance<SelectOption>, SelectMultipleProps>(
  ({ label, hint, options, disabled, name, onBlur, onChange, required, value }, ref) => {
    return (
      <div>
        <Label text={label} disabled={disabled} required={required} />
        <Hint text={hint} disabled={disabled} />
        <ReactSelect
          isMulti
          classNamePrefix='cp-select-multiple'
          options={options}
          noOptionsMessage={() => 'Sem opções'}
          isDisabled={disabled}
          placeholder='Selecione'
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

SelectMultiple.displayName = 'SelectMultiple';

export default SelectMultiple;
