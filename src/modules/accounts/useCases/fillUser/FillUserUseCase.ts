import { inject, injectable } from 'tsyringe';

import { UserMap } from '@modules/accounts/mappers/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';

@injectable()
class FillUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }
  async execute(id: string): Promise<User | null> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}
export { FillUserUseCase };
