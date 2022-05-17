import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { Orders } from '@prisma/client';

@injectable()
class FindAllOrdersUseCase {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {
    //
  }
  async execute(): Promise<Orders[]> {
    const orders = await this.orderRepository.findAll();

    return orders;
  }
}
export { FindAllOrdersUseCase };
