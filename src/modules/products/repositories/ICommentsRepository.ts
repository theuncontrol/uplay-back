import { Comments } from '@prisma/client';

import { ICreateComment, IEditComment } from '../dtos/IProduct';

export interface ICommentsRepository {
  create(data: ICreateComment): Promise<Comments>;
  findAll(): Promise<Comments[]>;
  update(data: IEditComment): Promise<Comments>;
  findById(id: string): Promise<Comments | null>;
}
