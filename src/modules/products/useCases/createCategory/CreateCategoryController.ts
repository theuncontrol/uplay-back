import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    const { name } = request.body;
    const image_file = request.file?.filename;
    const createCategory = await createCategoryUseCase.execute({
      name,
      image_file,
    });
    return response.status(201).json(createCategory);
  }
}
export { CreateCategoryController };
