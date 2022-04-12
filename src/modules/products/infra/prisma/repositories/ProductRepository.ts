import { prisma } from 'database/prismaClient';

import {
  IAddToCart,
  ICreateProduct,
  IUpdateProduct,
} from '@modules/products/dtos/IProduct';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Product } from '@prisma/client';

class ProductRepository implements IProductRepository {
  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
  async update({
    id,
    description,
    name,
    price,
    warranty,
  }: IUpdateProduct): Promise<Product> {
    const updateProduct = await prisma.product.update({
      where: { id },
      data: { description, name, price, warranty },
    });

    return updateProduct;
  }
  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({});
    return products;
  }
  async create({
    name,
    description,
    warranty,
    price,
    color,
    reference,
  }: ICreateProduct): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        warranty,
        price,
        color,
        reference,
      },
    });

    return product;
  }
  async addToCart({ userId, productsIds }: IAddToCart): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        cart: productsIds,
      },
    });
  }
}

export { ProductRepository };
