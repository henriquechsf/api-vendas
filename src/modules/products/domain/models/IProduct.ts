import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  orderProducts: IOrdersProducts[];
  created_at: Date;
  updated_at: Date;
}
