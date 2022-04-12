import { prisma } from 'database/prismaClient';

import { ICreateProfile } from '@modules/accounts/dtos/ICreateProfile';
import { IProfileRepository } from '@modules/accounts/repositories/IProfileRepository';
import { Profile } from '@prisma/client';

class ProfileRepository implements IProfileRepository {
  async findById(id: string | null | undefined): Promise<Profile | null> {
    const profile = await prisma.profile.findUnique({ where: { id } });
    return profile;
  }
  async create({ name, resources }: ICreateProfile): Promise<void> {
    await prisma.profile.create({
      data: {
        name,
        resources: { create: resources },
      },
    });
  }
  async findByName(name: string): Promise<Profile | null> {
    const profile = await prisma.profile.findUnique({
      where: {
        name,
      },
    });

    return profile;
  }
}

export { ProfileRepository };
