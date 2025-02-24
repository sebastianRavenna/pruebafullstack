import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { dataRoutes } from "./src/routes/dataRoutes.js";

dotenv.config(); // Cargar variables de entorno

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/data", dataRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  connectDB();
});
