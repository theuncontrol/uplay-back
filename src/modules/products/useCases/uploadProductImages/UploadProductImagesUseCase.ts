import { inject, injectable } from 'tsyringe';

import { IProductImagesRepository } from '@modules/products/repositories/IProductImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  product_id: string;
  images_name: string[];
}
@injectable()
class UploadProductImagesUseCase {
  constructor(
    @inject('ProductImagesRepository')
    private productImagesRepository: IProductImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }
  async execute({ product_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.productImagesRepository.create(product_id, image);
      await this.storageProvider.save(image, 'products');
    });
  }
}

export { UploadProductImagesUseCase };
