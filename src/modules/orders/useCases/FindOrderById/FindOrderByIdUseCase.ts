import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { Orders } from '@prisma/client';

@injectable()
class FindOrderByIdUseCase {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {
    //
  }
  async execute(id: string): Promise<Orders> {
    const order = (await this.orderRepository.findById(id)) as Orders;

    return order;
  }
}
export { FindOrderByIdUseCase };
