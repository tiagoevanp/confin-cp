import { type NumberValue } from './NumberValue';

export type Purchase = {
  date: string;
  value: NumberValue;
  discount_value: NumberValue;
  discount_percentage: NumberValue;
  quantity: number;
};
