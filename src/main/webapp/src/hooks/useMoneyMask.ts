import { useCallback } from 'react';

type useMoneyMaskReturn = (value: string) => string;

export const moneyMask = (value: string, point: ',' | '.' = '.'): string => {
  const valueArray = Number(value.replace('.', '')).toString().padStart(3, '0').split('');
  valueArray.splice(-2, 0, point);

  return valueArray.join('');
};

export const useMoneyMask = (): useMoneyMaskReturn => {
  return useCallback(moneyMask, []);
};
