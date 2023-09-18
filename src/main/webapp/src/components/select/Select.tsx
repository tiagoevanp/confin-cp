// import { useState, type FC, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { type FC } from 'react';
import ReactSelect from 'react-select';
import './Select.scss';
import Label from '../input/Label';
import Hint from '../input/Hint';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  disabled?: boolean;
  label?: string;
  hint?: string;
  options: SelectOption[];
};

const Select: FC<SelectProps> = ({ label, hint, options, disabled }) => {
  return (
    <div>
      <Label text={label} disabled={disabled} />
      <Hint text={hint} disabled={disabled} />
      <ReactSelect
        options={options}
        noOptionsMessage={() => 'Sem opções'}
        isDisabled={disabled}
        placeholder='Selecione'
        classNamePrefix='cp-select'
      />
    </div>
  );
};

export default Select;
