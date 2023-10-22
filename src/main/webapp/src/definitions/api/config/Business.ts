import { type ValueType } from '../helpers/ValueType';

export type Business = {
  id:
    | 'profit_default'
    | 'credit_card_fee'
    | 'pix_fee'
    | 'bank_slip_fee'
    | 'pro_labore'
    | 'supplies_default';
  value: { integer: number; decimal: number; type: ValueType };
  values: Array<{ value: string; label: string }>;
};
