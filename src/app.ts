import express from "express";
import productRoutes from "./routes/product.routes";
import userRoutes from './routes/user.routes';
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Permite peticiones desde el frontend

app.use(express.json()); // Asegura que Express pueda leer JSON

app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

