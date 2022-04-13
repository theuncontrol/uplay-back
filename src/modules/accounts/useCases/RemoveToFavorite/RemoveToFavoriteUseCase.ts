import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  productId: string;
}

@injectable()
class RemoveToFavoriteUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ userId, productId }: IRequest): Promise<void> {
    await this.usersRepository.removeToFavorite(userId, productId);
  }
}
export { RemoveToFavoriteUseCase };
