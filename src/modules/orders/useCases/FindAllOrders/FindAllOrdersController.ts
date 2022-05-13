import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllOrdersUseCase } from './FindAllOrdersUseCase';

class FindAllOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllOrderUseCase = container.resolve(FindAllOrdersUseCase);

    const orders = await findAllOrderUseCase.execute();

    return response.status(201).json(orders);
  }
}
export { FindAllOrdersController };
