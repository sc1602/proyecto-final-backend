import { Router } from "express";
import { createUser,loginUser } from "../controllers/user.controller";

const router = Router();

// Ruta para crear un nuevo usuario
router.post("/register", createUser);
router.post("/login", loginUser); 

export default router;
