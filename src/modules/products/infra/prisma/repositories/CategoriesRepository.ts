import { prisma } from 'database/prismaClient';

import { ICreateCategory } from '@modules/products/dtos/IProduct';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { Categories } from '@prisma/client';

class CategoriesRepository implements ICategoriesRepository {
  async create({ name, image_file }: ICreateCategory): Promise<Categories> {
    const create = await prisma.categories.create({
      data: {
        name,
        image: image_file,
      },
    });
    return create;
  }
  async findAll(): Promise<Categories[]> {
    const categories = await prisma.categories.findMany({});
    return categories;
  }
  async findById(id: string): Promise<Categories | null> {
    const category = await prisma.categories.findUnique({ where: { id } });
    return category;
  }
  async deleteById(id: string): Promise<void> {
    await prisma.categories.delete({ where: { id } });
  }
}

export { CategoriesRepository };
