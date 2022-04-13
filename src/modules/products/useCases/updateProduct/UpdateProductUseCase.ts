import { inject, injectable } from 'tsyringe';

import { IUpdateProduct } from '@modules/products/dtos/IProduct';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Product } from '@prisma/client';

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}
  async execute({
    id,
    description,
    name,
    price,
    warranty,
    comments,
    note,
    stock,
  }: IUpdateProduct): Promise<Product> {
    const updateProduct = await this.productRepository.update({
      id,
      description,
      name,
      price,
      warranty,
      comments,
      note,
      stock,
    });
    return updateProduct;
  }
}
export { UpdateProductUseCase };
