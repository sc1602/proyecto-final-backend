import { Router } from "express";
import { getProducts, createProduct } from "../controllers/product.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", getProducts);
router.post("/", authenticateToken, createProduct);
// Ruta para actualizar un producto por ID
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: updatedData,
      });
  
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error en PUT /api/products/:id:", error);
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  });
  

export default router;
