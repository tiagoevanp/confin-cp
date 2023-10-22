import { type NumberValue } from './helpers/NumberValue';

type DiscountType = 'PERCENTAGE' | 'MONEY_INTEGER';

export type Discount = {
  id: string;
  name: string;
  value: NumberValue;
  type: { value: DiscountType; label: string };
};
