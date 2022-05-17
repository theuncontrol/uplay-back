import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IEditComment } from '@modules/products/dtos/IProduct';
import { ICommentsRepository } from '@modules/products/repositories/ICommentsRepository';
import { Comments } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
  comment: string;
}

@injectable()
class EditCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}
  async execute({ id, comment, user_id }: IRequest): Promise<Comments> {
    const existentComment = await this.commentsRepository.findById(id);

    if (existentComment?.userId !== user_id) {
      throw new AppError(
        'Edição permitida apenas para o criador do comentário',
        401
      );
    }

    const editedComment = await this.commentsRepository.update({ id, comment });
    return editedComment;
  }
}
export { EditCommentUseCase };
