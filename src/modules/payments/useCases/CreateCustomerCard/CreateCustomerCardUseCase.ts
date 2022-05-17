import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';
import {
  ICreateCustomerData,
  IPaymentProvider,
} from '@shared/container/providers/PaymentProvider/IPaymentProvider';

interface IRequest {
  id: string;
  payment_method_id: string;
  issue_id: string;
  token: string;
}

@injectable()
class CreateCustomerCardUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider
  ) { }
  async execute({
    id,
    payment_method_id,
    issue_id,
    token,
  }: IRequest): Promise<void> {
    let user;
    const { email, first_name, last_name } =
      (await this.usersRepository.findById(id)) as User;

    user = await this.paymentProvider.findUser(email);

    if (!user) {
      user = await this.paymentProvider.createCustomer({
        email,
        first_name,
        last_name,
      });
    }
    const customer_id = user.id;
    await this.paymentProvider.createCard({
      customer_id,
      payment_method_id,
      issue_id,
      token,
    });

    // await this.paymentProvider.removeUser(_id);
  }
}
export { CreateCustomerCardUseCase };
