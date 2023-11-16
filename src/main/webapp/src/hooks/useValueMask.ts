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

  if (valueDecimal === 0 && value.type === 'PERCENTAGE') {
    return `${value.integer}%`;
  }

  switch (value.type) {
    case 'MONEY':
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(parseFloat(`${value.integer}.${value.decimal}`));
    case 'PERCENTAGE':
      return `${value.integer},${value.decimal}%`;
  }
};

export const useValueMask = (): useValueMaskReturn => useCallback(valueMask, []);
