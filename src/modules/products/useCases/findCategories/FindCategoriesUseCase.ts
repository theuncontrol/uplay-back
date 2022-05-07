import { inject, injectable } from 'tsyringe';

import { CategoryMap } from '@modules/products/mappers/CategoryMap';
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
    return categories.map((category) => CategoryMap.toDTO(category));
  }
}
export { FindCategoriesUseCase };
