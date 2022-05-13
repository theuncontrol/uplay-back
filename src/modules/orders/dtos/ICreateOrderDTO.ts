export interface ICreateOrderDTO {
  statusId: string;
  userId: string;
  productsIds: string[];
  orderNumber: string;
  trackingNumber: string;
  totalPrice: string;
  paymentStatus: string;
  installments: string;
  installmentsValue: string;
}
