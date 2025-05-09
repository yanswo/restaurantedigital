import { Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  static async create(req: Request, res: Response) {
    const { name, description, price, categoryId, imageUrl } = req.body;

    try {
      const product = await ProductService.create({
        name,
        description,
        price,
        categoryId,
        imageUrl,
      });
      res.status(201).json(product);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    const { categoryId } = req.params;

    try {
      const products = await ProductService.listByCategory(categoryId);
      res.status(200).json(products);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { productId } = req.params;
    const { name, description, price, categoryId, imageUrl } = req.body;

    try {
      const updatedProduct = await ProductService.update(productId, {
        name,
        description,
        price,
        categoryId,
        imageUrl,
      });
      res.status(200).json(updatedProduct);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { productId } = req.params;

    try {
      await ProductService.delete(productId);
      res.status(204).send(); // Retorna sucesso sem conteúdo
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
