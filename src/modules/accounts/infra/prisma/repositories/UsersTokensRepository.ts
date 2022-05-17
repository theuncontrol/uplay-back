import { prisma } from 'database/prismaClient';

import { IUserTokenDTO } from '@modules/accounts/dtos/IUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UserTokens } from '@prisma/client';

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IUserTokenDTO): Promise<UserTokens> {
    const userToken = await prisma.userTokens.create({
      data: { expires_date, refresh_token, user_id },
    });

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null> {
    const userTokens = await prisma.userTokens.findFirst({
      where: {
        user_id,
        refresh_token,
      },
    });
    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userTokens.delete({ where: { id } });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    const userToken = await prisma.userTokens.findFirst({
      where: { refresh_token },
    });
    return userToken;
  }
}

export { UsersTokensRepository };
