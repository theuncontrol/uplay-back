import { inject, injectable } from 'tsyringe';

import { IResourcesRepository } from '@modules/accounts/repositories/IResourcesRepository';
import { Resources } from '@prisma/client';

interface ICreateResources {
  key: string;
  value: string;
}
@injectable()
class CreateResourcesUseCase {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository
  ) {}
  async execute({ key, value }: ICreateResources): Promise<Resources> {
    const createdResource = await this.resourcesRepository.create(key, value);

    return createdResource;
  }
}
export { CreateResourcesUseCase };
