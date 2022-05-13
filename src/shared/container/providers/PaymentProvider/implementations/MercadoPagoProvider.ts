import mercadopago from 'mercadopago';
import { CardCreateResponse } from 'mercadopago/resources/cards';
import { PaymentCreateResponse } from 'mercadopago/resources/payment';

import { IPaymentDTO } from '@modules/payments/useCases/ProcessPayment/ProcessPaymentUseCase';

import {
  ICreateCardData,
  ICreateCustomerData,
  IMPUser,
  IPaymentProvider,
} from '../IPaymentProvider';

class MercadoPagoProvider implements IPaymentProvider {
  constructor() {
    mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);
  }
  async paymentCreate({
    description,
    installments,
    issuer_id,
    payer,
    payment_method_id,
    token,
    transaction_amount,
  }: IPaymentDTO): Promise<PaymentCreateResponse> {
    const createPayment = await mercadopago.payment.create({
      installments,
      payer,
      payment_method_id,
      transaction_amount,
      token,
      issuer_id,
      description,
    });

    return createPayment;
  }
  async removeUser(id: string): Promise<void> {
    await mercadopago.customers.remove(id);
  }
  async findUser(email: string): Promise<IMPUser> {
    const user = await mercadopago.customers.search({
      qs: {
        email,
      },
    });
    return user.response.results[0];
  }
  async getAllPaymentsMethods(): Promise<any> {
    const { body } = await mercadopago.payment_methods.listAll();
    return body;
  }

  async createCustomer({
    email,
    first_name,
    last_name,
  }: ICreateCustomerData): Promise<IMPUser> {
    const customerData = {
      email,
      first_name,
      last_name,
    };

    const createUser = await mercadopago.customers.create(customerData);

    return createUser.response;
  }
  async createCard({
    customer_id,
    issue_id,
    payment_method_id,
    token,
  }: ICreateCardData): Promise<CardCreateResponse> {
    const cardData = {
      token,
      customer_id,
      issuer_id: issue_id,
      payment_method_id,
    };

    const createCard = await mercadopago.card.create(cardData);

    return createCard;
  }
}

export { MercadoPagoProvider };
