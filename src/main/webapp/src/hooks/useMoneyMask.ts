import { useCallback } from 'react';

type useMoneyMaskReturn = (value: string) => string;

export const moneyMask = (value: string): string => {
  const onlyNumbers = value
    .replace(/[^0-9]/, '')
    .replace(',', '')
    .replace('.', '');

  if (onlyNumbers === '') return '';

  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
    parseFloat(onlyNumbers) / 100,
  );
};

export const useMoneyMask = (): useMoneyMaskReturn => {
  return useCallback(moneyMask, []);
};
