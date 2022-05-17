import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveToCartUseCase } from './RemoveToCartUseCase';

class RemoveToCartController {
  async handle(request: Request, response: Response): Promise<Response> {
    const removeToCartUseCase = container.resolve(RemoveToCartUseCase);
    const { id: userId } = request.user;
    const { productId } = request.body;
    await removeToCartUseCase.execute({ userId, productId });
    return response.status(200).send();
  }
}
export { RemoveToCartController };
