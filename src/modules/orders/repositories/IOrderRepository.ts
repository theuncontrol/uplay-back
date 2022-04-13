import { Orders } from '@prisma/client';

import { ICreateOrder } from '../dtos/ICreateOrder';
import { IUpdateOrder } from '../dtos/IUpdateOrder';

interface IOrderRepository {
  create(data: ICreateOrder): Promise<Orders>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Orders[]>;
  findById(id: string): Promise<Orders | null>;
  update(data: IUpdateOrder): Promise<Orders>;
}

export { IOrderRepository };
