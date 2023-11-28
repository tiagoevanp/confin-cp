import { type NumberValue } from './helpers/NumberValue';
import { type Option } from './helpers/Option';
import { type Purchase } from './helpers/Purchase';

export type Product = {
  id: string;
  name: string;
  purchase: Purchase;
  profit_percentage: NumberValue;
  supplier_id: Option;
  supply_id: Option[];
  discount_id: Option;
};

export type Profit = {
  id: string;
  name: string;
  profit_percentage: NumberValue;
};
