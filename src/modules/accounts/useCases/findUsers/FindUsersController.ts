import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUsersUseCase } from './FindUsersUseCase';

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findUsersUseCase = container.resolve(FindUsersUseCase);

    const users = await findUsersUseCase.execute();

    return response.json(users);
  }
}
export { FindUserController };
