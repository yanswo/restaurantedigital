import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderService {
  static async create(
    userId: string,
    restaurantId: string,
    items: Array<{ productId: string; quantity: number }>
  ) {
    let total = 0;

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
    const validStatuses = ["PENDENTE", "EM ANDAMENTO", "CONCLUIDO"];
    if (!validStatuses.includes(status)) {
      throw new Error(
        "Status inválido. Use: PENDENTE, EM ANDAMENTO ou CONCLUIDO."
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return updatedOrder;
  }
}
