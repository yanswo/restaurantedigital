import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdminMiddleware";

const router = Router();

router.post("/", authenticateToken, OrderController.create);

router.get("/:restaurantId", authenticateToken, isAdmin, OrderController.list);

router.put(
  "/:orderId/status",
  authenticateToken,
  isAdmin,
  OrderController.updateStatus
);

export default router;
