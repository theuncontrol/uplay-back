import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { FindUserController } from '@modules/accounts/useCases/findUsers/FindUsersController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController';
import { AddToCartController } from '@modules/products/useCases/addToCart/AddToCartController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserController = new UpdateUserController();

userRoutes.post('/create', createUserController.handle);
userRoutes.get(
  '/getAll',
  ensureAuthenticated,
  ensureAdmin,
  findUserController.handle
);
userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);
userRoutes.put('/update', ensureAuthenticated, updateUserController.handle);

export { userRoutes };
