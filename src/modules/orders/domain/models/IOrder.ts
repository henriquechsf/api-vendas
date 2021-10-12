import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IOrdersProducts } from './IOrdersProducts';

export interface IOrder {
  id: string;
  // order: number;
  customer: ICustomer;
  orderProducts: IOrdersProducts[];
  created_at: Date;
  updated_at: Date;
}
