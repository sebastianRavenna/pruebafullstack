import { Data } from "../models/DataModel.js";

// Obtener todos los datos (GET)
const getData = async (req, res) => {
  try {
    const data = await Data.find();
        
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos" });
  }
};

const postData = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Se requiere un campo 'text'" });
    }

    const newData = new Data({ text });
    const savedData = await newData.save();

    return res.status(201).json(savedData);
  } catch (error) {
    console.error("Error en POST:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { getData, postData };