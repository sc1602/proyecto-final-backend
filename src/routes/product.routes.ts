import { Router } from "express";
import { getProducts, createProduct } from "../controllers/product.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getProducts);
router.post("/", authenticateToken, createProduct);

export default router;
