import { useCallback } from 'react';
import { type NumberValue } from '../definitions/api/helpers/NumberValue';
import { moneyMask } from './useMoneyMask';

type useInputMaskReturn = (value: NumberValue) => string;

export const inputMask = (value: NumberValue): string => {
  if (value == null) return '';

  switch (value.type) {
    case 'MONEY':
      return moneyMask(`${value.integer}${value.decimal === 0 ? '00' : value.decimal}`);
    case 'PERCENTAGE':
      if (value.decimal === 0) {
        return `${value.integer}`;
      }

      return `${value.integer}.${value.decimal}`;
    default:
      return '';
  }
};

export const useInputMask = (): useInputMaskReturn => useCallback(inputMask, []);
