import { type Product } from './Product';
import { type NumberValue } from './helpers/NumberValue';

export type Deal = Omit<Product, 'purchase' | 'supply_id' | 'discount_id'> & {
  cost: NumberValue;
  price: NumberValue;
};
