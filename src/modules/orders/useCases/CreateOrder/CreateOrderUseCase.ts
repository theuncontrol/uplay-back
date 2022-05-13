import { DTO } from 'DTO';
import { inject, injectable } from 'tsyringe';

import { ICreateOrderDTO } from '@modules/orders/dtos/ICreateOrderDTO';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { Orders } from '@prisma/client';

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) { }
  async execute({ }: ICreateOrderDTO): Promise<Orders> { }
}
export { CreateOrderUseCase };
