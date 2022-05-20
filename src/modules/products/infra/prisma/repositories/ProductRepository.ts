/* eslint-disable no-await-in-loop */
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
    const product = await prisma.product.findUnique({
      where: { id },
      include: { comments: { include: { user: true } }, product_image: true },
    });
    return product;
  }
  async findAllByCategoryId(
    categoryId: string,
    limit: number
  ): Promise<Product[]> {
    const product = await prisma.product.findMany({
      where: { categoryId },
      take: limit,
      include: { product_image: true },
    });

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
  async findAll(
    limit: number,
    orderField: string,
    order: string
  ): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: { comments: true, product_image: true },
      take: limit,
      orderBy: {
        [orderField]: order,
      },
    });
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
  async addToCart({
    userId,
    productId,
    qtn,
    totalPrice,
  }: IAddToCart): Promise<void> {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { productsQtn: true },
    });

    const productsQtns = await prisma.productQtn.findFirst({
      where: { cartId: cart?.id, productId },
    });

    if (_.isNil(productsQtns)) {
      delete cart?.id;
      cart?.productsIds.push(productId);
      await prisma.cart.update({
        where: { userId },
        data: {
          ...cart,
          productsQtn: {
            create: {
              productId,
              qtn,
              totalPrice,
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { userId },
        data: {
          productsQtn: {
            update: {
              where: { productId },
              data: {
                qtn,
                totalPrice,
              },
            },
          },
        },
      });
    }
  }

  async removeToCart(userId: string, productId: string): Promise<void> {
    const cart = (await prisma.cart.findFirst({
      where: { userId },
      include: { productsQtn: true },
    })) as Cart;
    const productQtn = await prisma.productQtn.findFirst({
      where: { cartId: cart?.id, productId },
    });

    if (productQtn) {
      await prisma.productQtn.delete({
        where: { productId },
      });
      cart?.productsIds = _.filter(cart?.productsIds, (id) => id !== productId);
      await prisma.cart.update({
        where: { userId },
        data: {
          productsIds: cart?.productsIds,
        },
      });
    }
  }
}

export { ProductRepository };
