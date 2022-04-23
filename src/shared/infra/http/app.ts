import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';

import 'express-async-errors';

import '@shared/container';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import cors from 'cors';

import swaggerFile from '../../../swagger.json';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api/v1', router);
app.use(
  '/api/v1/tmp',
  express.static(path.resolve(__dirname, '..', '..', '..', '..', 'tmp'))
);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
