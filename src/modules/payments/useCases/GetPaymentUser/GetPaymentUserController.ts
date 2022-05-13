import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetPaymentUserUseCase } from './GetPaymentUserUseCase';

class GetPaymentUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const getPaymentUserUseCase = container.resolve(GetPaymentUserUseCase);
    const user = await getPaymentUserUseCase.execute(id);

    return response.status(201).json(user);
  }
}
export { GetPaymentUserController };
