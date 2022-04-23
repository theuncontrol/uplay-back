import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      lastname,
      email,
      password,
      password_confirmed,
      phone,
      address,
    } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const createUser = await createUserUseCase.execute({
      name: `${name} ${lastname}`,
      email,
      password,
      password_confirmed,
      phone,
      address,
    });

    return response.status(201).json(createUser);
  }
}
export { CreateUserController };
