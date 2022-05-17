import { Profile } from '@prisma/client';

import { ICreateProfile } from '../dtos/ICreateProfile';

interface IProfileRepository {
  create(data: ICreateProfile): Promise<void>;
  findByName(name: string): Promise<Profile | null>;
  findById(id: string | null | undefined): Promise<Profile | null>;
}

export { IProfileRepository };
