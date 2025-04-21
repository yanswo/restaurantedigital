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
}
