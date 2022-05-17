import { prisma } from 'database/prismaClient';

import { ICreateComment, IEditComment } from '@modules/products/dtos/IProduct';
import { ICommentsRepository } from '@modules/products/repositories/ICommentsRepository';
import { Comments } from '@prisma/client';

class CommentsRepository implements ICommentsRepository {
  async findById(id: string): Promise<Comments | null> {
    const comment = await prisma.comments.findFirst({ where: { id } });
    return comment;
  }
  async update({ comment, id }: IEditComment): Promise<Comments> {
    const edited = await prisma.comments.update({
      where: { id },
      data: { comment },
    });
    return edited;
  }
  async findAll(): Promise<Comments[]> {
    const comments = await prisma.comments.findMany({});
    return comments;
  }
  async create({
    productId,
    userId,
    comment,
  }: ICreateComment): Promise<Comments> {
    const create = await prisma.comments.create({
      data: {
        productId,
        userId,
        comment,
      },
    });

    return create;
  }
}

export { CommentsRepository };
