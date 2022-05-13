import { Router } from 'express';

import { FindAllOrdersController } from '@modules/orders/useCases/FindAllOrders/FindAllOrdersController';
import { FindOrderByIdController } from '@modules/orders/useCases/FindOrderById/FindOrderByIdController';

const ordersRoutes = Router();

const findAllOrdersController = new FindAllOrdersController();
const findOrderByIdController = new FindOrderByIdController();

ordersRoutes.get('/all', findAllOrdersController.handle);
ordersRoutes.get('/:id', findOrderByIdController.handle);

export { ordersRoutes };
