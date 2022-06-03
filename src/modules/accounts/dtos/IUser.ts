interface IAddress {
  name: string;
  street: string;
  city: string;
  province: string;
  state: string;
  number: string;
  complement?: string;
  district: string;
  cep: string;
}

interface ICreateUser {
  first_name: string;
  last_name: string;
  password: string;
  password_confirmed?: string;
  email: string;
  phone: string;
  address: IAddress;
  profileId?: string;
}

interface IUpdateUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: [];
  profileId?: string;
}

export interface IAddToFavorite {
  userId: string;
  productsIds: string[];
}

export { IAddress, ICreateUser, IUpdateUser };
