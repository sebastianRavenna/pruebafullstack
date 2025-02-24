import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dataRoutes } from "./routes/DataRoutes.js";

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/data", dataRoutes);

export { app };
