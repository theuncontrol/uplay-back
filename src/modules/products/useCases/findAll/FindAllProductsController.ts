import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllProductsUseCase } from './FindAllProductsUseCase';

class FindAllProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllProductsUseCase = container.resolve(FindAllProductsUseCase);
    const { limit, orderField, order } = request.query;
    const products = await findAllProductsUseCase.execute(
      limit,
      orderField,
      order
    );

    return response.status(200).json(products);
  }
}
export { FindAllProductsController };
