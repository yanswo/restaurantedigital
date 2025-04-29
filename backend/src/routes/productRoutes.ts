import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdminMiddleware";

const router = Router();

router.post("/", authenticateToken, isAdmin, ProductController.create);

router.get("/:categoryId", ProductController.list);

router.put("/:productId", authenticateToken, isAdmin, ProductController.update);

router.delete(
  "/:productId",
  authenticateToken,
  isAdmin,
  ProductController.delete
);

export default router;
