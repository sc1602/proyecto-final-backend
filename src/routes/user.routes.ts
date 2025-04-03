import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const router = Router();

// Ruta para crear un nuevo usuario
router.post("/register", createUser);

export default router;
