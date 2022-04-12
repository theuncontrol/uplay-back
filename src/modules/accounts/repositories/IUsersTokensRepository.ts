import { UserTokens } from '@prisma/client';

import { IUserTokenDTO } from '../dtos/IUserTokenDTO';

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: IUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<UserTokens | null>;
}

export { IUsersTokensRepository };
