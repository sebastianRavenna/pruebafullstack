import express from "express";
import cors from "cors";
import { dataRoutes } from "./routes/DataRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/data", dataRoutes);

export { app };
