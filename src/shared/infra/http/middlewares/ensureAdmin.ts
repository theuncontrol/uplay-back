import { NextFunction, Request, Response } from 'express';

import { ProfileRepository } from '@modules/accounts/infra/prisma/repositories/ProfileRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const profileRepository = new ProfileRepository();

  const user = await usersRepository.findById(id);
  const profile = await profileRepository.findById(user?.profileId);

  if (profile?.name !== 'admin_user') {
    throw new AppError("User isn't admin!", 401);
  }

  return next();
}
