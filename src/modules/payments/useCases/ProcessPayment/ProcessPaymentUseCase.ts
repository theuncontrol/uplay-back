/* eslint-disable no-param-reassign */
import { prisma } from 'database/prismaClient';
import { PaymentCreateResponse } from 'mercadopago/resources/payment';
import { container, inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { Orders, Product, Status, User } from '@prisma/client';
import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';

import { CreateCustomerCardUseCase } from '../CreateCustomerCard/CreateCustomerCardUseCase';

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
  saveDataValue: boolean;
  productsIds: string[];
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
    private orderRepository: IOrderRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository
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
    const createCustomerCardUseCase = container.resolve(
      CreateCustomerCardUseCase
    );

    let order;

    const { email, first_name, last_name } =
      (await this.usersRepository.findById(id)) as User;
    body.payer.email = email;

    const createPayment = await this.paymentProvider.paymentCreate(body);

    const { productsIds } = body;

    if (createPayment.response.status === 'approved') {
      const { id: statusId } = (await prisma.status.findFirst({
        where: { key: 'pending' },
      })) as Status;

      order = await this.createOrder(createPayment, productsIds, id, statusId);
      if (order) {
        productsIds.map(async (product: string) => {
          await this.productRepository.removeToCart(id, product);
        });
      }

      // if (body.saveDataValue === true) {
      //   await createCustomerCardUseCase.execute({
      //     user_id: id,
      //     issue_id: body.issuer_id,
      //     payment_method_id: 'credit_card',
      //     token: body.token,
      //   });
      // }
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
