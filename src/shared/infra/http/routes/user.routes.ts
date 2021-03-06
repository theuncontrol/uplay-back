import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { AddToFavoriteController } from '@modules/accounts/useCases/addToFavorite/AddToFavoriteController';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { FillUserController } from '@modules/accounts/useCases/fillUser/FillUserController';
import { FindUserController } from '@modules/accounts/useCases/findUsers/FindUsersController';
import { RemoveToFavoriteController } from '@modules/accounts/useCases/RemoveToFavorite/RemoveToFavoriteController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserController = new UpdateUserController();
const addToFavoriteController = new AddToFavoriteController();
const removeToFavoriteController = new RemoveToFavoriteController();
const fillUserController = new FillUserController();

userRoutes.post('/create', createUserController.handle);
userRoutes.get(
  '/',
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

userRoutes.post(
  '/addToFavorite',
  ensureAuthenticated,
  addToFavoriteController.handle
);
userRoutes.put(
  '/removeToFavorite',
  ensureAuthenticated,
  removeToFavoriteController.handle
);

userRoutes.get('/profile', ensureAuthenticated, fillUserController.handle);

export { userRoutes };
