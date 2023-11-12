import { useCallback } from 'react';

type useMoneyMaskReturn = (value: string) => string;

export const moneyMask = (value: string): string => {
  if (value === '') return value;

  const onlyNumbers = value
    .replace(/[^0-9]/, '')
    .replace(',', '')
    .replace('.', '');

  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
    parseFloat(onlyNumbers) / 100,
  );
};

export const useMoneyMask = (): useMoneyMaskReturn => {
  return useCallback(moneyMask, []);
};
