import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCategoryController } from '@modules/products/useCases/createCategory/CreateCategoryController';
import { FindCategoriesController } from '@modules/products/useCases/findCategories/FindCategoriesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const uploadCategoryImage = multer(uploadConfig.upload('./tmp/categories'));
const createCategoryController = new CreateCategoryController();
const findCategoriesController = new FindCategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/create',
  ensureAuthenticated,
  ensureAdmin,
  uploadCategoryImage.single('image'),
  createCategoryController.handle
);

categoriesRoutes.get('/get_all', findCategoriesController.handle);

export { categoriesRoutes };
