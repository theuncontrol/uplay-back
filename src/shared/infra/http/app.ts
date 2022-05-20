import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import '@shared/container';

import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import cors from 'cors';

import swaggerFile from '../../../swagger.json';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api/v1', router);
app.use('/api/v1/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use(
  '/api/v1/product/image',
  express.static(`${upload.tmpFolder}/products`)
);
app.use(
  '/api/v1/category/image',
  express.static(`${upload.tmpFolder}/categories`)
);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ message: err.message, code: err.code });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
