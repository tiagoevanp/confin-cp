export type Business = {
  id:
    | 'profit_default'
    | 'credit_card_fee'
    | 'pix_fee'
    | 'bank_slip_fee'
    | 'pro_labore'
    | 'supplies_default';
  value: number;
  values: Array<{ value: string; label: string }>;
};
