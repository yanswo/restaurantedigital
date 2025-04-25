import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RestaurantService {
  static async create(name: string, userId: string) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existing = await prisma.restaurant.findUnique({ where: { slug } });
    if (existing) throw new Error("Já existe um restaurante com esse nome.");

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        slug,
        userId,
      },
    });

    return restaurant;
  }

  static async getAll() {
    return prisma.restaurant.findMany({
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async update(restaurantId: string, name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { name, slug },
    });

    return updatedRestaurant;
  }

  static async delete(restaurantId: string) {
    await prisma.restaurant.delete({
      where: { id: restaurantId },
    });
  }
}
