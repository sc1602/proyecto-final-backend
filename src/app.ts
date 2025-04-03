import express from "express";
import productRoutes from "./routes/product.routes";
import userRoutes from './routes/user.routes';
import dotenv from "dotenv";
import cors from "cors";
const { PrismaClient } = require("@prisma/client")
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Permite peticiones desde el frontend

app.use(express.json()); // Asegura que Express pueda leer JSON

app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes);

app.put("/api/products/:id", async (req, res) => {
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

// Ruta para eliminar un producto
app.delete("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Elimina el producto de la base de datos
      const deletedProduct = await prisma.product.delete({
        where: { id },
      });
  
      // Responde con el producto eliminado
      res.json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));



