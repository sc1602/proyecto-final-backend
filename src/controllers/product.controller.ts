import { Request, Response } from "express";
import { prisma } from "../config/database";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};
