import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdminMiddleware";

const router = Router();

// Admin cria categorias para um restaurante
router.post("/", authenticateToken, isAdmin, CategoryController.create);

// Qualquer usuário pode listar categorias de um restaurante
router.get("/:restaurantId", CategoryController.list);

export default router;
