import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createProductUseCase = container.resolve(CreateProductUseCase);
    const { name, description, price, warranty, color, reference } =
      request.body;

    const create = await createProductUseCase.execute({
      name,
      description,
      price,
      warranty,
      color,
      reference,
    });
    return response.status(201).json(create);
  }
}
export { CreateProductController };
