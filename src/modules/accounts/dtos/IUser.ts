interface IAddress {
  street: string;
  city: string;
  province: string;
  state: string;
  number: string;
  complement: string;
}

interface ICreateUser {
  name: string;
  password: string;
  password_confirmed?: string;
  email: string;
  phone: string;
  address: [];
  profileId?: string;
}

interface IUpdateUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: [];
  profileId?: string;
  favorites?: [];
  cart?: [];
}

export { IAddress, ICreateUser, IUpdateUser };
