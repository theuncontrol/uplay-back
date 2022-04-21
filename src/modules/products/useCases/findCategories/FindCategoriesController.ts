import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCategoriesUseCase } from './FindCategoriesUseCase';

class FindCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findCategories = container.resolve(FindCategoriesUseCase);
    const categories = await findCategories.execute();
    return response.status(200).json(categories);
  }
}
export { FindCategoriesController };
