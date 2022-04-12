import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProductUseCase } from './DeleteProductUseCase';

class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteProductUseCase = container.resolve(DeleteProductUseCase);
    const { id } = request.params;

    await deleteProductUseCase.execute(id);
    return response.status(200).send();
  }
}
export { DeleteProductController };
