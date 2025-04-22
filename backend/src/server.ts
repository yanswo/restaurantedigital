import restaurantRoutes from "./routes/restaurantRoutes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";

import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
