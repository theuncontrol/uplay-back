import { inject, injectable } from 'tsyringe';

import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Product } from '@prisma/client';

@injectable()
class FindAllByCategoryUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) { }
  async execute(categoryId: string): Promise<Product[]> {
    const products = await this.productRepository.findAllByCategoryId(
      categoryId
    );
    return products;
  }
}
export { FindAllByCategoryUseCase };
