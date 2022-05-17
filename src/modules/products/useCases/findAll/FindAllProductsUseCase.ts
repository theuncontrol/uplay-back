import { inject, injectable } from 'tsyringe';

import { ProductMap } from '@modules/products/mappers/ProductMap';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Product } from '@prisma/client';

@injectable()
class FindAllProductsUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) { }
  async execute(
    limit = 1000,
    orderField = 'id',
    order = 'asc'
  ): Promise<Product[]> {
    const products = await this.productRepository.findAll(
      Number(limit),
      orderField,
      order
    );

    return products.map((product) => ProductMap.toDTO(product));
  }
}
export { FindAllProductsUseCase };
