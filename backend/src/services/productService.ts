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
}
