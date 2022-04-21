import { inject, injectable } from 'tsyringe';

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
    return product;
  }
}
export { FindByIdUseCase };
