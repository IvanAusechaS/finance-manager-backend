import express from "express";
import cors from "cors";
import accountRoutes from "./routes/account.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/account",accountRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API de Autenticación funcionando" });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
