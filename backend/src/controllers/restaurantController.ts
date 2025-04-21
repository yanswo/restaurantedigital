import { Request, Response } from "express";
import { RestaurantService } from "../services/restaurantServices";

export class RestaurantController {
  static async create(req: Request, res: Response) {
    const { name } = req.body;
    const userId = req.user?.userId;

    try {
      const restaurant = await RestaurantService.create(name, userId!);
      res.status(201).json(restaurant);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
