import { inject, injectable } from 'tsyringe';

import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Product } from '@prisma/client';

@injectable()
class FindAllProductsUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) { }
  async execute(limit = 1000): Promise<Product[]> {
    const products = await this.productRepository.findAll(Number(limit));

    return products;
  }
}
export { FindAllProductsUseCase };
