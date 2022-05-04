import { Product } from '@prisma/client';

interface IProductImage {
  id: string;
  productId: string;
  image_name: string;
  image_url: string;
}

interface IProductResponse {
  id: string;
  name: string;
  price: string;
  brand: string;
  code: string;
  color: string;
  warranty: string;
  stock: string;
  note: string;
  description: string;
  reference: string;
  comments: string;
  product_images: IProductImage[];
  categoryId: string;
}

class ProductMap {
  static getImgUrl(image: string | null): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/product/image/${image}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/product/image/${image}`;
      default:
        return '';
    }
  }
  static toDTO({
    id,
    name,
    price,
    brand,
    code,
    color,
    warranty,
    stock,
    note,
    description,
    reference,
    categoryId,
    comments,
    product_image,
  }: Product): IProductResponse {
    const product_images = product_image.map((image) => {
      return {
        ...image,
        image_url: this.getImgUrl(image.image_name),
      };
    });

    const product = {
      id,
      name,
      price,
      brand,
      code,
      color,
      warranty,
      stock,
      note,
      description,
      reference,
      product_image: product_images,
      categoryId,
      comments,
    };
    return product;
  }
}

export { ProductMap };
