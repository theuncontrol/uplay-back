import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  productsIds: string[];
}

@injectable()
class AddToFavoriteUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ userId, productsIds }: IRequest): Promise<void> {
    await this.usersRepository.addToFavorite({ userId, productsIds });
  }
}
export { AddToFavoriteUseCase };
