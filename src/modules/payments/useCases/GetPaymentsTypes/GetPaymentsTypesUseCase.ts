import mercadopago from 'mercadopago';
import { inject, injectable } from 'tsyringe';

import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';

@injectable()
class GetPaymentsTypesUseCase {
  constructor(
    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider
  ) { }

  async execute(): Promise<void> {
    const allMethods = await this.paymentProvider.getAllPaymentsMethods();
    return allMethods;
  }
}
export { GetPaymentsTypesUseCase };
