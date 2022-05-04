import { container } from 'tsyringe';
import '@shared/container/providers';

import { ProfileRepository } from '@modules/accounts/infra/prisma/repositories/ProfileRepository';
import { ResourcesRepostiry } from '@modules/accounts/infra/prisma/repositories/ResourcesRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IProfileRepository } from '@modules/accounts/repositories/IProfileRepository';
import { IResourcesRepository } from '@modules/accounts/repositories/IResourcesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { CategoriesRepository } from '@modules/products/infra/prisma/repositories/CategoriesRepository';
import { CommentsRepository } from '@modules/products/infra/prisma/repositories/CommentsRepository';
import { ProductImagesRepository } from '@modules/products/infra/prisma/repositories/ProductImagesRepository';
import { ProductRepository } from '@modules/products/infra/prisma/repositories/ProductRepository';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { ICommentsRepository } from '@modules/products/repositories/ICommentsRepository';
import { IProductImagesRepository } from '@modules/products/repositories/IProductImagesRepository';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);

container.registerSingleton<IProfileRepository>(
  'ProfileRepository',
  ProfileRepository
);

container.registerSingleton<IResourcesRepository>(
  'ResourcesRepository',
  ResourcesRepostiry
);

container.registerSingleton<IProductImagesRepository>(
  'ProductImagesRepository',
  ProductImagesRepository
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);
