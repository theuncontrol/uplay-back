import { inject, injectable } from 'tsyringe';

import { IProductRepository } from '@modules/products/repositories/IProductRepository';

interface IRequest {
  userId: string;
  productsIds: string[];
}

@injectable()
class AddToCartUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}
  async execute({ userId, productsIds }: IRequest): Promise<void> {
    await this.productRepository.addToCart({ userId, productsIds });
  }
}
export { AddToCartUseCase };
