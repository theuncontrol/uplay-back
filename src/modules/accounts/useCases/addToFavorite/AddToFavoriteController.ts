import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddToFavoriteUseCase } from './AddToFavoriteUseCase';

class AddToFavoriteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const addToFavoriteUseCase = container.resolve(AddToFavoriteUseCase);
    const { id: userId } = request.user;
    const { productsIds } = request.body;
    await addToFavoriteUseCase.execute({ userId, productsIds });
    return response.status(200).send();
  }
}
export { AddToFavoriteController };
