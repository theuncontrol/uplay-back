import { prisma } from 'database/prismaClient';
import _ from 'lodash';

import {
  IAddToCart,
  ICreateProduct,
  IUpdateProduct,
} from '@modules/products/dtos/IProduct';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Cart, Product } from '@prisma/client';

class ProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
  }
  async findAllByCategoryId(categoryId: string): Promise<Product[]> {
    const product = await prisma.product.findMany({ where: { categoryId } });

    return product;
  }
  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
  async update({
    id,
    description,
    name,
    price,
    warranty,
    stock,
  }: IUpdateProduct): Promise<Product> {
    const updateProduct = await prisma.product.update({
      where: { id },
      data: { description, name, price, warranty, stock },
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
    code,
    stock,
    brand,
    categoryId,
  }: ICreateProduct): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        warranty,
        price,
        color,
        reference,
        code,
        stock,
        brand,
        categoryId,
      },
    });

    return product;
  }
  async addToCart({ userId, productsIds }: IAddToCart): Promise<void> {
    await prisma.cart.update({
      where: { userId },
      data: {
        productsIds,
      },
    });
  }

  async removeToCart(userId: string, productId: string): Promise<void> {
    const cart = await prisma.cart.findFirst({ where: { userId } });

    if (!_.isNil(cart)) {
      cart.productsIds = _.filter(cart.productsIds, (id) => id !== productId);
      console.log('cart>>', cart);
      await prisma.cart.update({
        where: { userId },
        data: {
          productsIds: cart.productsIds,
        },
      });
    }
  }
}

export { ProductRepository };
