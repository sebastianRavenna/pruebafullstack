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

// Guardar nuevo dato (POST)
const postData = async (req, res) => {
  try {
    const { text } = req.body;
    const newData = new Data({ text });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar el dato" });
  }
};


export { getData, postData };