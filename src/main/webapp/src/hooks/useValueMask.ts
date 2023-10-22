import { useCallback } from 'react';
import { type ValueType } from '../definitions/api/helpers/ValueType';
type ValueMaskProps =
  | {
      integer: number;
      decimal: number;
      type: ValueType;
    }
  | undefined;

type useValueMaskReturn = (value: ValueMaskProps) => string;

export const valueMask: useValueMaskReturn = (value) => {
  if (value?.integer == null) {
    return '';
  }

  const valueDecimal = value.decimal === 0 && value.type === 'MONEY' ? '00' : value.decimal;

  if (valueDecimal === 0) {
    return `${value.integer}`;
  }

  return `${value.integer}.${valueDecimal}`;
};

export const useValueMask = (): useValueMaskReturn => useCallback(valueMask, []);
