import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCommentUseCase } from './CreateCommentUseCase';

class CreateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCommentUseCase = container.resolve(CreateCommentUseCase);
    const { id: userId } = request.user;
    const { productId } = request.params;
    const { comment } = request.body;

    const createComment = await createCommentUseCase.execute({
      comment,
      productId,
      userId,
    });

    return response.status(201).json({ createComment });
  }
}
export { CreateCommentController };
