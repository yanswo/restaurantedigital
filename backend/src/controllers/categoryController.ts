import { Request, Response } from "express";
import { CategoryService } from "../services/categoryServices";

export class CategoryController {
  static async create(req: Request, res: Response) {
    const { name, restaurantId } = req.body;

    try {
      const category = await CategoryService.create(name, restaurantId);
      res.status(201).json(category);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    const { restaurantId } = req.params;

    try {
      const categories = await CategoryService.listByRestaurant(restaurantId);
      res.status(200).json(categories);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { categoryId } = req.params;
    const { name } = req.body;

    try {
      const updatedCategory = await CategoryService.update(categoryId, name);
      res.status(200).json(updatedCategory);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { categoryId } = req.params;

    try {
      await CategoryService.delete(categoryId);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
