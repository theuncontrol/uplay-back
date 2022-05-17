import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomerCardUseCase } from './CreateCustomerCardUseCase';

class CreateCustomerCardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCustomCardUseCase = container.resolve(
      CreateCustomerCardUseCase
    );
    const { id } = request.user;
    const { payment_method_id, issue_id, token } = request.body;
    await createCustomCardUseCase.execute({
      id,
      payment_method_id,
      issue_id,
      token,
    });

    return response.status(201).send();
  }
}
export { CreateCustomerCardController };
