import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserMap } from '@modules/accounts/mappers/UserMap';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file?.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    const user = await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file,
    });

    const returnUser = UserMap.toDTO(user);

    return response.status(200).json({ avatar_url: returnUser.avatar_url });
  }
}

export { UpdateUserAvatarController };
