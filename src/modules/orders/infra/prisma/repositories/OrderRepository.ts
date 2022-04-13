import { prisma } from 'database/prismaClient';

import { ICreateOrder } from '@modules/orders/dtos/ICreateOrder';
import { IUpdateOrder } from '@modules/orders/dtos/IUpdateOrder';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { Orders } from '@prisma/client';

class OrderRepository implements IOrderRepository {
  async create({
    userId,
    statusId,
    trackingNumber,
    orderNumber,
    productsIds,
    totalPrice,
  }: ICreateOrder): Promise<Orders> {
    const order = await prisma.orders.create({
      data: {
        userId,
        statusId,
        trackingNumber,
        orderNumber,
        productsIds,
        totalPrice,
      },
    });
    return order;
  }
  async delete(id: string): Promise<void> {
    await prisma.orders.delete({ where: { id } });
  }
  async findAll(): Promise<Orders[]> {
    const orders = await prisma.orders.findMany({});
    return orders;
  }
  async findById(id: string): Promise<Orders | null> {
    const order = await prisma.orders.findFirst({ where: { id } });
    return order;
  }
  async update({
    id,
    orderNumber,
    productsIds,
    statusId,
    totalPrice,
    trackingNumber,
  }: IUpdateOrder): Promise<Orders> {
    const order = await prisma.orders.update({
      where: { id },
      data: {
        orderNumber,
        productsIds,
        statusId,
        totalPrice,
        trackingNumber,
      },
    });
    return order;
  }
}
export { OrderRepository };
