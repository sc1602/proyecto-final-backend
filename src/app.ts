import express from "express";
import productRoutes from "./routes/product.routes";
import userRoutes from './routes/user.routes';
import dotenv from "dotenv";
import cors from "cors";

const { PrismaClient } = require("@prisma/client");
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Permite peticiones desde el frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Asegura que Express pueda leer JSON
app.use(express.json());

// Middleware para loguear las solicitudes HTTP
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();  // Pasa al siguiente middleware o ruta
});

// Rutas de productos y usuarios
app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes);

// Rutas específicas de productos
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

// Función para imprimir todas las rutas disponibles
const printRoutes = (app: express.Application) => {
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Si el middleware tiene una ruta (i.e., es un enrutador)
      console.log(`${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
    }
  });
};


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  printRoutes(app);  // Imprimir las rutas al iniciar
});
