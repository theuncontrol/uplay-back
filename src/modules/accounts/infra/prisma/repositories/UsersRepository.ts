import { prisma } from 'database/prismaClient';
import _ from 'lodash';

import {
  IAddToFavorite,
  ICreateUser,
  IUpdateUser,
} from '@modules/accounts/dtos/IUser';
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
  }: IUpdateUser): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        address,
        email,
        name,
        phone,
        profileId,
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
        profile: { include: { resources: true } },
      },
    });

    await prisma.cart.create({
      data: {
        userId: createdUser.id,
      },
    });

    await prisma.favorites.create({
      data: {
        userId: createdUser.id,
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
      include: {
        profile: { include: { resources: true } },
        cart: true,
        favorites: true,
      },
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

  async addToFavorite({ userId, productsIds }: IAddToFavorite): Promise<void> {
    await prisma.favorites.update({
      where: { userId },
      data: {
        productsIds,
      },
    });
  }

  async removeToFavorite(userId: string, productId: string): Promise<void> {
    const favorites = await prisma.favorites.findFirst({ where: { userId } });

    if (!_.isNil(favorites)) {
      favorites.productsIds = _.filter(
        favorites.productsIds,
        (id) => id !== productId
      );

      await prisma.favorites.update({
        where: { userId },
        data: {
          productsIds: favorites.productsIds,
        },
      });
    }
  }
}

export { UsersRepository };
