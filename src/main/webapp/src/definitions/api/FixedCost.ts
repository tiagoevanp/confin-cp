import { type ValueType } from './helpers/ValueType';

export type FixedCost = {
  id: string;
  name: string;
  value: { integer: number; decimal: number; type: ValueType };
};
