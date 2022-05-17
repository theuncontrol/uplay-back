import { ProductImage } from '@prisma/client';

interface IProductImagesRepository {
  create(product_id: string, image_name: string): Promise<ProductImage>;
}

export { IProductImagesRepository };
