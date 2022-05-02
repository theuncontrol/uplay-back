import { inject, injectable } from 'tsyringe';

import { IProductRepository } from '@modules/products/repositories/IProductRepository';

interface IRequest {
  userId: string;
  productId: string;
  qtn: number;
}

@injectable()
class AddToCartUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) { }
  async execute({ userId, productId, qtn }: IRequest): Promise<void> {
    await this.productRepository.addToCart({ userId, productId, qtn });
  }
}
export { AddToCartUseCase };
