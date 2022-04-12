import { prisma } from 'database/prismaClient';

import { ICreateUser, IUpdateUser } from '@modules/accounts/dtos/IUser';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';

class UsersRepository implements IUsersRepository {
  async updateUser({
    id,
    address,
    email,
    name,
    phone,
    profileId,
    favorites,
    cart,
  }: IUpdateUser): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        address,
        email,
        name,
        phone,
        profileId,
        favorites,
        cart,
      },
    });

    return updatedUser;
  }
  async create({
    name,
    email,
    password,
    phone,
    address,
  }: ICreateUser): Promise<User> {
    const profile = await prisma.profile.findFirst({
      where: {
        name: 'basic_user',
      },
    });
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phone,
        address,
        profileId: profile?.id,
      },
      include: {
        // Address: true,
        profile: { include: { resources: true } },
      },
    });

    return createdUser;
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    return user;
  }
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: { profile: { include: { resources: true } } },
    });
    return users;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
  async updatePassword(
    id: string | undefined,
    password: string
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return user;
  }
  async updateAvatar(id: string, avatar?: string): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data: { avatar } });
    return user;
  }
}

export { UsersRepository };
