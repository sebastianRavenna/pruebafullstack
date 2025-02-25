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
  // Si es una preflight request, responder sin procesar
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "https://pruebafullstack.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const body = req.body;
    console.log("Body recibido:", body);

    if (!body || !body.text) {
      return res.status(400).json({ error: "Se requiere un campo 'text'" });
    }

    const newData = new Data({ text: body.text });
    const savedData = await newData.save();

    return res.status(201).json(savedData);
  } catch (error) {
    console.error("Error en POST:", error);
    return res.status(500).json({ error: error.message });
  }
};



export { getData, postData };