import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader); // 👈 Verificamos el header

  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado, token no encontrado" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token recibido:", token); // 👈 Verificamos el token recibido

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Token decodificado:", decoded); // 👈 Vemos el contenido del token
    req.user = decoded;  
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};



