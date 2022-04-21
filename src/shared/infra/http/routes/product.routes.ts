import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { AddToCartController } from '@modules/products/useCases/addToCart/AddToCartController';
import { CreateCategoryController } from '@modules/products/useCases/createCategory/CreateCategoryController';
import { CreateCommentController } from '@modules/products/useCases/createComment/CreateCommentController';
import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { DeleteProductController } from '@modules/products/useCases/deleteProduct/DeleteProductController';
import { EditCommentController } from '@modules/products/useCases/editComment/EditCommentController';
import { FindAllProductsController } from '@modules/products/useCases/findAll/FindAllProductsController';
import { FindAllByCategoryController } from '@modules/products/useCases/findAllByCategory/FindAllByCategoryController';
import { FindByIdController } from '@modules/products/useCases/findById/FindByIdController';
import { RemoveToCartController } from '@modules/products/useCases/RemoveToCart/RemoveToCartController';
import { UpdateProductController } from '@modules/products/useCases/updateProduct/UpdateProductController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const productRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createProductController = new CreateProductController();
const findAllProductsController = new FindAllProductsController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

const createCommentController = new CreateCommentController();
const editCommentController = new EditCommentController();

const addToCartController = new AddToCartController();
const removeToCartController = new RemoveToCartController();
const findAllByCategoryId = new FindAllByCategoryController();
const findByIdController = new FindByIdController();

productRoutes.post(
  '/create',
  ensureAuthenticated,
  ensureAdmin,
  createProductController.handle
);

productRoutes.get('/all', findAllProductsController.handle);
productRoutes.get('/:productId', findByIdController.handle);

productRoutes.put(
  '/update',
  ensureAuthenticated,
  ensureAdmin,
  updateProductController.handle
);
productRoutes.delete('/:id', deleteProductController.handle);

productRoutes.post(
  '/comment/create/:productId',
  ensureAuthenticated,
  createCommentController.handle
);
productRoutes.patch(
  '/comment/edit/:id',
  ensureAuthenticated,
  editCommentController.handle
);

productRoutes.post(
  '/addToCart',
  ensureAuthenticated,
  addToCartController.handle
);
productRoutes.put(
  '/removeToCart',
  ensureAuthenticated,
  removeToCartController.handle
);

productRoutes.get('/by_category/:categoryId', findAllByCategoryId.handle);

export { productRoutes };
