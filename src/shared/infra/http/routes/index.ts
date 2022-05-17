import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { categoriesRoutes } from './categories.routes';
import { ordersRoutes } from './orders.routes';
import { passwordRoutes } from './password.routes';
import { paymentsRoutes } from './payments.routes';
import { productRoutes } from './product.routes';
import { profileRoutes } from './profiles.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/profile', profileRoutes);
router.use('/password', passwordRoutes);
router.use('/product', productRoutes);
router.use('/categories', categoriesRoutes);
router.use('/payments', paymentsRoutes);
router.use('/orders', ordersRoutes);
router.use(authRoutes);

export { router };
