import { Router } from 'express';

import { CreateCustomerCardController } from '@modules/payments/useCases/CreateCustomerCard/CreateCustomerCardController';
import { GetPaymentsTypesController } from '@modules/payments/useCases/GetPaymentsTypes/GetPaymentsTypesController';
import { GetPaymentUserController } from '@modules/payments/useCases/GetPaymentUser/GetPaymentUserController';
import { ProcessPaymentController } from '@modules/payments/useCases/ProcessPayment/ProcessPaymentController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const paymentsRoutes = Router();

const getPaymentsTypesController = new GetPaymentsTypesController();
const createCustomerCardController = new CreateCustomerCardController();
const getPaymentUserController = new GetPaymentUserController();
const processPaymentController = new ProcessPaymentController();

paymentsRoutes.get('/payments_types', getPaymentsTypesController.handle);
paymentsRoutes.post(
  '/create_user_card',
  ensureAuthenticated,
  createCustomerCardController.handle
);

paymentsRoutes.get(
  '/user',
  ensureAuthenticated,
  getPaymentUserController.handle
);

paymentsRoutes.post(
  '/process_payment',
  ensureAuthenticated,
  processPaymentController.handle
);

export { paymentsRoutes };
