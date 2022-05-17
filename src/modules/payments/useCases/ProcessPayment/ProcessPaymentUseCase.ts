/* eslint-disable no-param-reassign */
import { prisma } from 'database/prismaClient';
import { PaymentCreateResponse } from 'mercadopago/resources/payment';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { Orders, Status, User } from '@prisma/client';
import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';

interface IIdentification {
  type: string;
  number: string;
}

interface IPayer {
  email: string;
  identification: IIdentification;
}

export interface IPaymentDTO {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  installments: number;
  description: string;
  payer: IPayer;
}

interface IResponse {
  createPayment: PaymentCreateResponse;
  order?: Orders;
}

@injectable()
class ProcessPaymentUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider,
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {
    //
  }

  private async createOrder(
    createPayment: PaymentCreateResponse,
    productsIds: string[],
    userId: string,
    statusId: string
  ) {
    return (await this.orderRepository.create({
      paymentStatus: createPayment.response.status,
      orderNumber: createPayment.response.id.toString(),
      userId,
      totalPrice: createPayment.response.transaction_amount.toString(),
      statusId,
      trackingNumber: '01010',
      productsIds,
      installments: createPayment.response.installments.toString(),
      installmentsValue: (
        createPayment.response.transaction_amount /
        createPayment.response.installments
      ).toString(),
    })) as Orders;
  }

  async execute(body: IPaymentDTO, id: string): Promise<IResponse> {
    let order;
    const { email } = (await this.usersRepository.findById(id)) as User;
    body.payer.email = email;
    const createPayment = await this.paymentProvider.paymentCreate(body);
    const productsIds = ['6272845716f4a5c798ee5dbb'];

    if (createPayment.response.status === 'approved') {
      const { id: statusId } = (await prisma.status.findFirst({
        where: { key: 'pending' },
      })) as Status;
      order = await this.createOrder(createPayment, productsIds, id, statusId);
    } else if (createPayment.response.status === 'rejected') {
      const { id: statusId } = (await prisma.status.findFirst({
        where: { key: 'canceled' },
      })) as Status;
      order = await this.createOrder(createPayment, productsIds, id, statusId);
    }

    return { createPayment, order };
  }
}
export { ProcessPaymentUseCase };
