import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
  static async create(data: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    imageUrl?: string;
  }) {
    const product = await prisma.product.create({ data });
    return product;
  }

  static async listByCategory(categoryId: string) {
    const products = await prisma.product.findMany({
      where: { categoryId },
    });

    return products;
  }

  static async update(
    productId: string,
    data: {
      name: string;
      description: string;
      price: number;
      categoryId: string;
      imageUrl?: string;
    }
  ) {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data,
      });

      return updatedProduct;
    } catch (error) {
      throw new Error(
        "Não é possível editar o produto porque ele possui dependências associadas."
      );
    }
  }

  static async delete(productId: string) {
    try {
      await prisma.orderItem.deleteMany({
        where: { productId },
      });

      await prisma.product.delete({
        where: { id: productId },
      });
    } catch (error) {
      throw new Error(
        "Não é possível excluir o produto porque ele possui dependências associadas."
      );
    }
  }
}
