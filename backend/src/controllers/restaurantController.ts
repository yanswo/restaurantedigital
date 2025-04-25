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

  static async getAll(req: Request, res: Response) {
    try {
      const restaurants = await RestaurantService.getAll();
      res.json(restaurants);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { restaurantId } = req.params;
    const { name } = req.body;

    try {
      const updatedRestaurant = await RestaurantService.update(
        restaurantId,
        name
      );
      res.status(200).json(updatedRestaurant);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { restaurantId } = req.params;

    try {
      await RestaurantService.delete(restaurantId);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
