import { inject, injectable } from 'tsyringe';

import { ProductMap } from '@modules/products/mappers/ProductMap';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Product } from '@prisma/client';

@injectable()
class FindByIdUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) { }
  async execute(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    return ProductMap.toDTO(product);
  }
}
export { FindByIdUseCase };
