export type Supplier = {
  id: string;
  name: string;
  marketplace: string;
  address: {
    street: string;
    number: number;
    zip_code: string;
  };
  contact: {
    phone_number: string[];
    email: string[];
  };
};
