import { Router } from 'express';

import { CreateResourcesController } from '@modules/accounts/useCases/createResources/CreateResourcesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();

const createResourcesController = new CreateResourcesController();

profileRoutes.post(
  '/resources/create',
  ensureAuthenticated,
  ensureAdmin,
  createResourcesController.handle
);

export { profileRoutes };
