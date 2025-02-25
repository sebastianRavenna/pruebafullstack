import { Data } from "../models/DataModel.js";

// Obtener todos los datos (GET)
const getData = async (req, res) => {
  try {
    console.log("🔍 GET /api/data - Iniciando petición");

    const data = await Data.find();
    console.log("📦 Datos obtenidos:", data);
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos" });
  }
};

const postData = async (req, res) => {
  console.log("🔍 POST /api/data - Iniciando");
  
  try {
    // Simplificar al máximo para diagnóstico
    const newData = new Data({ text: "Texto de prueba" });
    await newData.save();
    console.log("✅ Dato guardado:", newData);
    
    return res.status(201).json({ message: "Dato creado con éxito", data: newData });
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    return res.status(500).json({ message: error.message });
  }
};


export { getData, postData };