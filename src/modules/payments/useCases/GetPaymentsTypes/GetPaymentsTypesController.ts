import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetPaymentsTypesUseCase } from './GetPaymentsTypesUseCase';

class GetPaymentsTypesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getPaymentsTypesUseCase = container.resolve(GetPaymentsTypesUseCase);
    const objReturn = await getPaymentsTypesUseCase.execute();
    return response.status(201).json(objReturn);
  }
}
export { GetPaymentsTypesController };
