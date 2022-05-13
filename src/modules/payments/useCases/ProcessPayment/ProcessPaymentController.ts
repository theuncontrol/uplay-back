import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProcessPaymentUseCase } from './ProcessPaymentUseCase';

class ProcessPaymentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const processPaymentUseCase = container.resolve(ProcessPaymentUseCase);
    const { id } = request.user;
    const { body } = request;

    const processPayment = await processPaymentUseCase.execute(body, id);

    return response.status(201).json(processPayment);
  }
}
export { ProcessPaymentController };
