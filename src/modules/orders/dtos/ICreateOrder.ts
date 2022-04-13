export interface ICreateOrder {
  statusId: string;
  userId: string;
  productsIds: string[];
  orderNumber: string;
  trackingNumber: string;
  totalPrice: string;
}
