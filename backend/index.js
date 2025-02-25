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
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).send("❌ MongoDB no está conectado.");
    }

    const result = await mongoose.connection.db.admin().ping();
    console.log("Ping result:", result);
    res.send("✅ Conectado a MongoDB!");
  } catch (error) {
    console.error("Error en /test-db:", error);
    res.status(500).send("❌ No se pudo conectar a MongoDB");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

