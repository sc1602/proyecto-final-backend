import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/database";
import jwt from "jsonwebtoken";

// Controlador para crear un usuario
export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    console.log("Verificando si el usuario existe...");
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Hashear la contraseña
    console.log("Hasheando la contraseña...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    console.log("Creando el usuario...");
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generar el token
    console.log("Generando el token...");
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Devolver el token y la información del usuario
    console.log("Usuario creado y token generado");
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};
