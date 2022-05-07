import { inject, injectable } from 'tsyringe';

import { ICreateCategory } from '@modules/products/dtos/IProduct';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { Categories } from '@prisma/client';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }
  async execute({ name, image_file }: ICreateCategory): Promise<Categories> {
    const create = await this.categoriesRepository.create({ name, image_file });
    await this.storageProvider.save(image_file, 'categories');
    return create;
  }
}
export { CreateCategoryUseCase };
