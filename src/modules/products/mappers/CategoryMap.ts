import { Categories } from '@prisma/client';

interface ICategoryResponse {
  id: string;
  name: string;
  image: string | null;
  image_url: string;
}

class CategoryMap {
  static getImgUrl(image: string | null): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/category/image/${image}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/category/image/${image}`;
      default:
        return '';
    }
  }
  static toDTO({ id, name, image }: Categories): ICategoryResponse {
    const category = {
      id,
      name,
      image,
      image_url: this.getImgUrl(image),
    };
    return category;
  }
}

export { CategoryMap };
