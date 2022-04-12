import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddToCartUseCase } from './AddToCartUseCase';

class AddToCartController {
  async handle(request: Request, response: Response): Promise<Response> {
    const addToCartUseCase = container.resolve(AddToCartUseCase);
    const { id: userId } = request.user;
    const { productsIds } = request.body;
    await addToCartUseCase.execute({ userId, productsIds });
    return response.status(200).send();
  }
}
export { AddToCartController };
