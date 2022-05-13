import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindOrderByIdUseCase } from './FindOrderByIdUseCase';

class FindOrderByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findOrderByIdUseCase = container.resolve(FindOrderByIdUseCase);

    const { id } = request.params;

    const order = await findOrderByIdUseCase.execute(id);

    return response.status(200).json([order]);
  }
}
export { FindOrderByIdController };
