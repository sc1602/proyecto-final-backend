import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Acceso denegado" });
    return; // 🔹 Importante: Agregar return para evitar continuar la ejecución
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    res.status(403).json({ error: "Token inválido" });
    return;
  }
};

