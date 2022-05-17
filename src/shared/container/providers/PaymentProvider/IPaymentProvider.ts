import { CardCreateResponse } from 'mercadopago/resources/cards';
import { PaymentCreateResponse } from 'mercadopago/resources/payment';

import { IPaymentDTO } from '@modules/payments/useCases/ProcessPayment/ProcessPaymentUseCase';

export interface IMPAddress {
  id: any;
  zip_code: any;
  street_name: any;
  street_number: any;
  city: any;
}

export interface IMPIdentification {
  type: any;
  number: any;
}

export interface IMPMetadata {
  source_sync: string;
}

export interface IMPPhone {
  area_code: any;
  number: any;
}

export interface IMPUser {
  address: IMPAddress;
  addresses: any[];
  cards: any[];
  date_created: string;
  date_last_updated: string;
  date_registered: any;
  default_address: any;
  default_card: any;
  description: any;
  email: string;
  first_name: string;
  id: string;
  identification: IMPIdentification;
  last_name: string;
  live_mode: boolean;
  metadata: IMPMetadata;
  phone: IMPPhone;
}

interface ICreateCardData {
  token: string;
  customer_id: string;
  issue_id: string;
  payment_method_id: string;
}
interface ICreateCustomerData {
  email: string;
  first_name: string;
  last_name: string;
}

interface IPaymentProvider {
  removeUser(id: string): Promise<void>;
  findUser(email: string): Promise<IMPUser>;
  createCustomer(customerData: ICreateCustomerData): Promise<IMPUser>;
  createCard(cardData: ICreateCardData): Promise<CardCreateResponse>;
  getAllPaymentsMethods(): Promise<any>;
  paymentCreate(data: IPaymentDTO): Promise<PaymentCreateResponse>;
}

export { IPaymentProvider, ICreateCardData, ICreateCustomerData };
