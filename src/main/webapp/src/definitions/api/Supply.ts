export type Supply = {
  id: string;
  name: string;
  purchase: {
    date: string;
    value: number;
    discount_value: number;
    discount_percentage: number;
    quantity: number;
  };
  supplier_id: { value: string; label: string };
  annual_depreciation_value: number;
  annual_maintenance_value: number;
};
