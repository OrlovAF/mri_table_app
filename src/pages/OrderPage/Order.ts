export interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

export interface Customer {
  first_name: string;
  last_name: string;
  address: Address;
}

export interface Order {
  order_number: number;
  customer: Customer;
  order_details: {
    value: number;
    date: string;
  };
  shipping_details: {
    date: string;
  };
  status: string;
}