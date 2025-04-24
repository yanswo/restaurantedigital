// src/services/orderService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderService {
  static async create(
    userId: string,
    restaurantId: string,
    items: Array<{ productId: string; quantity: number }>
  ) {
    let total = 0;

    // Calculando o total do pedido
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) throw new Error("Produto não encontrado.");

        const subtotal = product.price * item.quantity;
        total += subtotal;

        return {
          productId: item.productId,
          quantity: item.quantity,
          subtotal,
        };
      })
    );

    // Criando o pedido
    const order = await prisma.order.create({
      data: {
        userId,
        restaurantId,
        total,
        items: {
          create: orderItems,
        },
      },
    });

    return order;
  }

  static async listByRestaurant(restaurantId: string) {
    const orders = await prisma.order.findMany({
      where: { restaurantId },
      include: { items: true },
    });

    return orders;
  }

  static async updateStatus(orderId: string, status: string) {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return order;
  }
}
