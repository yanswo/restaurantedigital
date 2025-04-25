import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdminMiddleware";

const router = Router();

router.post("/", authenticateToken, isAdmin, CategoryController.create);

router.get("/restaurant/:restaurantId", CategoryController.list);

export default router;
