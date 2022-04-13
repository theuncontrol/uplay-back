import { User } from '@prisma/client';

import { IAddToFavorite, ICreateUser, IUpdateUser } from '../dtos/IUser';

interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findById(id: string | null): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  updateAvatar(id: string, avatar?: string): Promise<User>;
  updatePassword(id: string | undefined, password: string): Promise<User>;
  updateUser(data: IUpdateUser): Promise<User>;
  addToFavorite(data: IAddToFavorite): Promise<void>;
  removeToFavorite(userId: string, productId: string): Promise<void>;
}

export { IUsersRepository };
