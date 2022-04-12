import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';

@injectable()
class FindUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
export { FindUsersUseCase };
