import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryService {
  static async create(name: string, restaurantId: string) {
    const exists = await prisma.category.findFirst({
      where: {
        name,
        restaurantId,
      },
    });

    if (exists) {
      throw new Error("Essa categoria já existe neste restaurante.");
    }

    const category = await prisma.category.create({
      data: {
        name,
        restaurantId,
      },
    });

    return category;
  }

  static async listByRestaurant(restaurantId: string) {
    const categories = await prisma.category.findMany({
      where: { restaurantId },
      include: {
        products: true,
      },
    });

    return categories;
  }

  static async update(categoryId: string, name: string) {
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: { name },
      });

      return updatedCategory;
    } catch (error) {
      throw new Error(
        "Não é possível editar a categoria porque ela possui dependências associadas."
      );
    }
  }

  static async delete(categoryId: string) {
    try {
      await prisma.product.deleteMany({
        where: { categoryId },
      });

      await prisma.category.delete({
        where: { id: categoryId },
      });
    } catch (error) {
      throw new Error(
        "Não é possível excluir a categoria porque ela possui dependências associadas."
      );
    }
  }
}
