import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { address, email, name, phone, profileId, favorites, cart } =
      request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const updateUser = await updateUserUseCase.execute({
      address,
      email,
      name,
      phone,
      profileId,
      favorites,
      cart,
      id,
    });
    return response.status(201).json({ updateUser });
  }
}
export { UpdateUserController };
