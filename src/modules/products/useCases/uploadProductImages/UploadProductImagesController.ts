import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadProductImagesUseCase } from './UploadProductImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadProductImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    const uploadProductImagesUseCase = container.resolve(
      UploadProductImagesUseCase
    );

    const images_name = images.map((file) => file.filename);

    await uploadProductImagesUseCase.execute({
      product_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadProductImagesController };
