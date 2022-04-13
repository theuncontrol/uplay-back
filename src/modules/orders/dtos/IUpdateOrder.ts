interface IUpdateOrder {
  statusId: string;
  productsIds: string[];
  orderNumber: string;
  trackingNumber: string;
  totalPrice: string;
  id: string;
}

export { IUpdateOrder };
