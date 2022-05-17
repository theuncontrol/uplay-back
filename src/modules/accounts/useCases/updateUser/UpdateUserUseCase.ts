import { inject, injectable } from 'tsyringe';

import { IUpdateUser } from '@modules/accounts/dtos/IUser';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    id,
    address,
    email,
    name,
    phone,
    profileId,
    favorites,
    cart,
  }: IUpdateUser): Promise<User> {
    const user = await this.usersRepository.updateUser({
      id,
      address,
      email,
      name,
      phone,
      profileId,
      favorites,
      cart,
    });

    return user;
  }
}
export { UpdateUserUseCase };
