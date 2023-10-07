type DiscountType = 'PERCENTAGE' | 'MONEY_INTEGER';

export type Discount = {
  id: string;
  name: string;
  value: number;
  type: { value: DiscountType; label: string };
};
