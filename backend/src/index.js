import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config(); // Cargar variables de entorno

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  connectDB();
});
