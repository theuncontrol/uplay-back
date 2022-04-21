import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllByCategoryUseCase } from './FindAllByCategoryUseCase';

class FindAllByCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { categoryId } = request.params;
    const findAllByCategoryId = container.resolve(FindAllByCategoryUseCase);

    const products = await findAllByCategoryId.execute(categoryId);

    return response.status(201).json(products);
  }
}
export { FindAllByCategoryController };
