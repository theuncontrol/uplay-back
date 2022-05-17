import { inject, injectable } from 'tsyringe';

import { ICreateProduct } from '@modules/products/dtos/IProduct';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Product } from '@prisma/client';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) { }
  async execute({
    name,
    description,
    price,
    warranty,
    color,
    reference,
    code,
    stock,
    brand,
    categoryId,
  }: ICreateProduct): Promise<Product> {
    const product = await this.productRepository.create({
      name,
      description,
      price,
      warranty,
      color,
      reference,
      code,
      stock,
      brand,
      categoryId,
    });

    return product;
  }
}
export { CreateProductUseCase };
