import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FillUserUseCase } from './FillUserUseCase';

class FillUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const fillUserUseCase = container.resolve(FillUserUseCase);
    const { id } = request.user;
    const user = await fillUserUseCase.execute(id);
    return response.status(200).json(user);
  }
}
export { FillUserController };
