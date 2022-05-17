import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateResourcesUseCase } from './CreateResourcesUseCase';

class CreateResourcesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { key, value } = request.body;
    const createResourceUseCase = container.resolve(CreateResourcesUseCase);

    await createResourceUseCase.execute({ key, value });

    return response.status(201).send();
  }
}
export { CreateResourcesController };
