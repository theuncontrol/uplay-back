import { prisma } from 'database/prismaClient';

import { IProductImagesRepository } from '@modules/products/repositories/IProductImagesRepository';
import { ProductImage } from '@prisma/client';

class ProductImagesRepository implements IProductImagesRepository {
  private repository;
  constructor() {
    this.repository = prisma.productImage;
  }

  async create(product_id: string, image_name: string): Promise<ProductImage> {
    const productImage = await this.repository.create({
      data: { productId: product_id, image_name },
    });

    return productImage;
  }
}

export { ProductImagesRepository };
