import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdminMiddleware";

const router = Router();

router.post("/", authenticateToken, isAdmin, CategoryController.create);
router.get("/restaurant/:restaurantId/categories", CategoryController.list);

router.put(
  "/:categoryId",
  authenticateToken,
  isAdmin,
  CategoryController.update
);

router.delete(
  "/:categoryId",
  authenticateToken,
  isAdmin,
  CategoryController.delete
);

export default router;
