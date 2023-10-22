import { type ValueType } from './helpers/ValueType';

type DiscountType = 'PERCENTAGE' | 'MONEY_INTEGER';

export type Discount = {
  id: string;
  name: string;
  value: { integer: number; decimal: number; type: ValueType };
  type: { value: DiscountType; label: string };
};
