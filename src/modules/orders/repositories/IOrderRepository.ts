import { Orders } from '@prisma/client';

import { ICreateOrderDTO } from '../dtos/ICreateOrderDTO';
import { IUpdateOrder } from '../dtos/IUpdateOrder';

interface IOrderRepository {
  create(data: ICreateOrderDTO): Promise<Orders>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Orders[]>;
  findById(id: string): Promise<Orders | null>;
  update(data: IUpdateOrder): Promise<Orders>;
}

export { IOrderRepository };
