import { Categories } from '@prisma/client';

import { ICreateCategory } from '../dtos/IProduct';

interface ICategoriesRepository {
  create(data: ICreateCategory): Promise<Categories>;
  findAll(): Promise<Categories[]>;
  findById(id: string): Promise<Categories | null>;
  deleteById(id: string): Promise<void>;
}

export { ICategoriesRepository };
