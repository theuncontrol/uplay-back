import { User } from '@prisma/client';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

class UserMap {
  static avatar_url(avatar: string | null): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`;
      default:
        return '';
    }
  }
  static toDTO({
    email,
    name,
    first_name,
    last_name,
    id,
    avatar,
    phone,
    address,
    cart,
    profile,
    favorites,
  }: User): IUserResponseDTO {
    const user = {
      id,
      first_name,
      last_name,
      email,
      name,
      phone,
      avatar,
      address,
      profile,
      cart,
      favorites,
      avatar_url: this.avatar_url(avatar),
    };
    return user;
  }
}

export { UserMap };
