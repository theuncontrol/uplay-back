import { inject, injectable } from 'tsyringe';

import { ProductMap } from '@modules/products/mappers/ProductMap';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Product } from '@prisma/client';

@injectable()
class FindAllByCategoryUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) { }
  async execute(categoryId: string, limit = 10000): Promise<Product[]> {
    const products = await this.productRepository.findAllByCategoryId(
      categoryId,
      Number(limit)
    );
    return products.map((product) => ProductMap.toDTO(product));
  }
}
export { FindAllByCategoryUseCase };
