import { prisma } from 'database/prismaClient';

import { IResourcesRepository } from '@modules/accounts/repositories/IResourcesRepository';
import { Resources } from '@prisma/client';

class ResourcesRepostiry implements IResourcesRepository {
  async create(key: string, value: string): Promise<Resources> {
    const resource = await prisma.resources.create({
      data: { key, value },
    });

    return resource;
  }
  async findById(id: string): Promise<Resources | null> {
    const resources = await prisma.resources.findUnique({ where: { id } });

    return resources;
  }
}

export { ResourcesRepostiry };
