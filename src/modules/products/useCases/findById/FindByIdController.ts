import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByIdUseCase } from './FindByIdUseCase';

class FindByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;
    const findByIdUseCase = container.resolve(FindByIdUseCase);
    const product = await findByIdUseCase.execute(productId);

    return response.status(201).json(product);
  }
}
export { FindByIdController };
