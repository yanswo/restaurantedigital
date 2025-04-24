import { Request, Response } from "express";
import { OrderService } from "../services/orderServices";

export class OrderController {
  static async create(req: Request, res: Response) {
    const { restaurantId, items } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const order = await OrderService.create(userId, restaurantId, items);
      res.status(201).json(order);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    const { restaurantId } = req.params;

    try {
      const orders = await OrderService.listByRestaurant(restaurantId);
      res.status(200).json(orders);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    const { orderId, status } = req.body;

    try {
      const order = await OrderService.updateStatus(orderId, status);
      res.status(200).json(order);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
