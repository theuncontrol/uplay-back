import { inject, injectable } from 'tsyringe';

import { IProductRepository } from '@modules/products/repositories/IProductRepository';

interface IRequest {
  userId: string;
  productId: string;
  qtn: number;
  price: number;
}

@injectable()
class AddToCartUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) { }
  async execute({ userId, productId, qtn, price }: IRequest): Promise<void> {
    const totalPrice = price * qtn;
    await this.productRepository.addToCart({
      userId,
      productId,
      qtn,
      totalPrice,
    });
  }
}
export { AddToCartUseCase };
