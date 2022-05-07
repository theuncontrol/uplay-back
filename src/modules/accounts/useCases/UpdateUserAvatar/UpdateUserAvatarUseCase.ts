import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }
  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (user?.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }
    await this.storageProvider.save(avatar_file, 'avatar');

    const returnUser = await this.usersRepository.updateAvatar(
      user_id,
      avatar_file
    );

    return returnUser;
  }
}

export { UpdateUserAvatarUseCase };
