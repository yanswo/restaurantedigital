// src/routes/restaurantRoutes.ts
import { Router } from "express";
import { RestaurantController } from "../controllers/restaurantController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdminMiddleware";

const router = Router();

router.post("/", authenticateToken, isAdmin, RestaurantController.create);
router.get("/", authenticateToken, RestaurantController.getAll);

export default router;
