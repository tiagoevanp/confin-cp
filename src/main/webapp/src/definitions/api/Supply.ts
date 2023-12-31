import { type NumberValue } from './helpers/NumberValue';
import { type Option } from './helpers/Option';
import { type Purchase } from './helpers/Purchase';

export type Supply = {
  id: string;
  name: string;
  purchase: Purchase;
  supplier_id: Option;
  annual_depreciation_value: NumberValue;
  annual_maintenance_value: NumberValue;
};
