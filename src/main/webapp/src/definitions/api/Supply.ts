import { type Purchase } from './helpers/Purchase';
import { type ValueType } from './helpers/ValueType';

export type Supply = {
  id: string;
  name: string;
  purchase: Purchase;
  supplier_id: { value: string; label: string };
  annual_depreciation_value: { integer: number; decimal: number; type: ValueType };
  annual_maintenance_value: { integer: number; decimal: number; type: ValueType };
};
