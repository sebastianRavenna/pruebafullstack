import { Data } from "../models/DataModel.js";

// Obtener todos los datos (GET)
const getData = async (req, res) => {
  try {
    console.log("🔍 GET /api/data - Iniciando petición");

    const data = await Data.find().limit(5);
    console.log("📦 Datos obtenidos:", data);
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos" });
  }
};

// Guardar nuevo dato (POST)
const postData = async (req, res) => {
  console.log("entrando al postData")
  const mongoose = await import("mongoose");
const mongooseInstance = mongoose.default || mongoose;
console.log("Estado de conexión MongoDB:", mongooseInstance.connection.readyState);
  try {
    console.log("📩 POST /api/data - Headers:", req.headers);
    console.log("📩 POST /api/data - Recibiendo datos", req.body);
    
    // Verificar si req.body está vacío o es undefined
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        message: "Error: El cuerpo de la petición está vacío",
        receivedBody: req.body
      });
    }
    
    // Verificar si existe la propiedad 'text'
    if (!req.body.text) {
      return res.status(400).json({ 
        message: "Error: Se requiere la propiedad 'text' en el cuerpo",
        receivedBody: req.body
      });
    }

    const { text } = req.body;
    const newData = new Data({ text });
    await newData.save();
    console.log("✅ Dato guardado:", newData);
    
    res.status(201).json(newData);
  } catch (error) {
    console.error("❌ Error en POST /api/data:", error);
    res.status(500).json({ 
      message: "Error al guardar el dato",
      error: error.message
    });
  }
};


export { getData, postData };