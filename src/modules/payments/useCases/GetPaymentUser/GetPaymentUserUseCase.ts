import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';
import {
  IMPUser,
  IPaymentProvider,
} from '@shared/container/providers/PaymentProvider/IPaymentProvider';

@injectable()
class GetPaymentUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider
  ) { }
  async execute(id: string): Promise<IMPUser> {
    const { email } = (await this.usersRepository.findById(id)) as User;
    const paymentUser = await this.paymentProvider.findUser(email);
    return paymentUser;
  }
}
export { GetPaymentUserUseCase };
