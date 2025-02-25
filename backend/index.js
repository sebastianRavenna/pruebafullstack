import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { dataRoutes } from "./src/routes/dataRoutes.js";

dotenv.config(); // Cargar variables de entorno

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use((req, res, next) => {
  console.log(`📝 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("📦 Headers:", req.headers);
  if (req.method === "POST") {
    console.log("📨 Body recibido:", req.body);
  }
  next();
});

// Middlewares
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());

// Rutas
app.use("/api/data", dataRoutes);

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/test-db", async (req, res) => {
  try {
    const mongoose = await import("mongoose");
    
    // Verificar si mongoose ya está conectado
    // Si usas import dinámico, necesitas acceder a la conexión mediante .default
    const mongooseInstance = mongoose.default || mongoose;
    
    if (!mongooseInstance.connection || mongooseInstance.connection.readyState !== 1) {
      // Si no está conectado, intentar conectar
      const MONGO_URI = process.env.MONGO_URI;
      await mongooseInstance.connect(MONGO_URI);
    }
    
    // Verificar la conexión
    await mongooseInstance.connection.db.command({ ping: 1 });
    res.send("✅ Conectado a MongoDB!");
  } catch (error) {
    console.error("Error en /test-db:", error);
    res.status(500).send(`❌ No se pudo conectar a MongoDB: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

