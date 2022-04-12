import { inject, injectable } from 'tsyringe';

import { IProductRepository } from '@modules/products/repositories/IProductRepository';

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}
  async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
export { DeleteProductUseCase };
