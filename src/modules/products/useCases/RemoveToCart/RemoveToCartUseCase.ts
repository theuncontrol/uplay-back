import { inject, injectable } from 'tsyringe';

import { IProductRepository } from '@modules/products/repositories/IProductRepository';

interface IRequest {
  userId: string;
  productId: string;
}

@injectable()
class RemoveToCartUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}
  async execute({ userId, productId }: IRequest): Promise<void> {
    await this.productRepository.removeToCart(userId, productId);
  }
}
export { RemoveToCartUseCase };
