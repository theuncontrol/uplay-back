import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { Categories } from '@prisma/client';

@injectable()
class FindCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) { }
  async execute(): Promise<Categories[]> {
    const categories = await this.categoriesRepository.findAll();
    return categories;
  }
}
export { FindCategoriesUseCase };
