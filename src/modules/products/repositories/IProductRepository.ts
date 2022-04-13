import { Product } from '@prisma/client';

import { IAddToCart, ICreateProduct, IUpdateProduct } from '../dtos/IProduct';

interface IProductRepository {
  create(data: ICreateProduct): Promise<Product>;
  findAll(): Promise<Product[]>;
  update(data: IUpdateProduct): Promise<Product>;
  delete(id: string): Promise<void>;
  addToCart(data: IAddToCart): Promise<void>;
  removeToCart(userId: string, productId: string): Promise<void>;
}

export { IProductRepository };
