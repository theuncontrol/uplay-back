import { Resources } from '@prisma/client';

interface ICreateProfile {
  name: string;
  resources: Resources[];
}

export { ICreateProfile };
