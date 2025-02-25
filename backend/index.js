import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { dataRoutes } from "./src/routes/dataRoutes.js";

dotenv.config(); // Cargar variables de entorno

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/data", dataRoutes);

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/test-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send("✅ Conectado a MongoDB!");
  } catch (error) {
    res.status(500).send("❌ No se pudo conectar a MongoDB");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

