import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const BASEURL=import.meta.env.VITE_BACKEND_BASEURL;
  

  // Obtener datos de la API (GET)
  const fetchData = useCallback (async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/data`);
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }, [BASEURL]);

  // Enviar datos a la API (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    try {
      await axios.post(`${BASEURL}/api/data`, { text: inputValue });
      
      setInputValue("");
      fetchData(); // Actualizar la lista
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container p-5">
      <h1 className="title">Fullstack App con React y Node.js</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label className="label">Nuevo dato</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ingresá un dato"
            />
          </div>
        </div>
        <button className="button is-primary" type="submit">
          Enviar
        </button>
      </form>

      {/* Lista de datos */}
      <div className="box">
        <h2 className="subtitle">Datos guardados:</h2>
        <ul>
          {data.map((item) => (
            <li key={item._id} className="box">{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { App };
