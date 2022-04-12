import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProductUseCase = container.resolve(UpdateProductUseCase);
    const { id, description, name, price, warranty, comments, note } =
      request.body;

    const product = await updateProductUseCase.execute({
      id,
      description,
      name,
      price,
      warranty,
      comments,
      note,
    });

    return response.status(201).json(product);
  }
}
export { UpdateProductController };
