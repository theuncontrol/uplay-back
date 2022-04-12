import { inject, injectable } from 'tsyringe';

import { ICreateComment } from '@modules/products/dtos/IProduct';
import { ICommentsRepository } from '@modules/products/repositories/ICommentsRepository';
import { Comments } from '@prisma/client';

@injectable()
class CreateCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}
  async execute({
    comment,
    productId,
    userId,
  }: ICreateComment): Promise<Comments> {
    const comments = await this.commentsRepository.create({
      comment,
      productId,
      userId,
    });
    return comments;
  }
}
export { CreateCommentUseCase };
