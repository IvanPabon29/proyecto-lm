import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Registrar registro de venta
export const registrarVenta = async (ventaData) => {
  try {
    const response = await axios.post(`${API_URL}/ventas`, ventaData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};


// Obtener los registros filtrados por fechas.
export const obtenerRegistros = async (fechaInicio, fechaFin) => {
  try {
    const response = await axios.get(`${API_URL}/registros`, {
      params: {
        fechaInicio,
        fechaFin,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    throw error;
  }
};

