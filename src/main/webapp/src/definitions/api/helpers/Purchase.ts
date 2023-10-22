import { type ValueType } from './ValueType';

export type Purchase = {
  date: string;
  value: { integer: number; decimal: number; type: ValueType };
  discount_value: { integer: number; decimal: number; type: ValueType };
  discount_percentage: { integer: number; decimal: number; type: ValueType };
  quantity: number;
};
