import { Cart, Favorites, Profile } from '@prisma/client';

interface IAddress {
  street: string;
  city: string;
  province: string;
  state: string;
  number: string;
  complement: string;
}

interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  avatar?: string;
  phone: string;
  avatar_url(): string;
  address?: IAddress[];
  profile?: Profile;
  cart?: Cart;
  favorites?: Favorites;
}

export { IUserResponseDTO };
