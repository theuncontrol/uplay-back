import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveToFavoriteUseCase } from './RemoveToFavoriteUseCase';

class RemoveToFavoriteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const removeToFavoriteUseCase = container.resolve(RemoveToFavoriteUseCase);
    const { id: userId } = request.user;
    const { productId } = request.body;
    await removeToFavoriteUseCase.execute({ userId, productId });
    return response.status(200).send();
  }
}
export { RemoveToFavoriteController };
