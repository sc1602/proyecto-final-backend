import express from "express";
import productRoutes from "./routes/product.routes";
import userRoutes from './routes/user.routes';
import dotenv from "dotenv";
dotenv.config();



const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

