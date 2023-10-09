import { useCallback } from 'react';

type useDateMaskReturn = (value: string) => string;

export const dateMask = (value: string): string => {
  return value
    .split('T')[0]
    .split('-')
    .reduceRight((acc, cur) => acc + `/${cur}`);
};

export const useDateMask = (): useDateMaskReturn => {
  return useCallback(dateMask, []);
};
