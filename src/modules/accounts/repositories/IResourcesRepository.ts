import { Resources } from '@prisma/client';

interface IResourcesRepository {
  create(key: string, value: string): Promise<Resources>;
  findById(id: string): Promise<Resources | null>;
}

export { IResourcesRepository };
