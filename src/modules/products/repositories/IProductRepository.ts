import { Product } from '@prisma/client';

import { IAddToCart, ICreateProduct, IUpdateProduct } from '../dtos/IProduct';

interface IProductRepository {
  create(data: ICreateProduct): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(limit: number): Promise<Product[]>;
  update(data: IUpdateProduct): Promise<Product>;
  delete(id: string): Promise<void>;
  addToCart(data: IAddToCart): Promise<void>;
  removeToCart(userId: string, productId: string): Promise<void>;
  findAllByCategoryId(categoryId: string, limit?: number): Promise<Product[]>;
}

export { IProductRepository };
