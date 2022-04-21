import { inject, injectable } from 'tsyringe';

import { ICreateCategory } from '@modules/products/dtos/IProduct';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { Categories } from '@prisma/client';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) { }
  async execute({ name, image_file }: ICreateCategory): Promise<Categories> {
    const create = await this.categoriesRepository.create({ name, image_file });
    return create;
  }
}
export { CreateCategoryUseCase };
