import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditCommentUseCase } from './EditCommentUseCase';

class EditCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const editCommentUseCase = container.resolve(EditCommentUseCase);
    const { id } = request.params;
    const { comment } = request.body;
    const { id: user_id } = request.user;
    const edited = await editCommentUseCase.execute({ id, comment, user_id });

    return response.status(200).json(edited);
  }
}
export { EditCommentController };
