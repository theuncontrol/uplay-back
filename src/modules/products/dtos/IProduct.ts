export interface ICreateProduct {
  name: string;
  price: string;
  description: string;
  warranty: string;
  color: string;
  reference: string;
  code: string;
  stock: string;
  brand: string;
}

export interface IUpdateProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  warranty: string;
  stock: string;
  comments?: [];
  note?: string;
}

export interface ICreateComment {
  productId: string;
  userId: string;
  comment: string;
}

export interface IEditComment {
  id: string;
  comment: string;
}

export interface IAddToCart {
  userId: string;
  productsIds: string[];
}
