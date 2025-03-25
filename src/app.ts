import express from "express";
import productRoutes from "./routes/product.routes";

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
