// src/api/productoApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Registrar Productos
export const registrarProducto = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/registro-entrada/nuevo-producto`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Obtener Productos 
export const obtenerProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Restar/Quitar Productos del inventario
export const restarProductos = async (idProducto, cantidad) => {
  try {
    const response = await axios.put(`${API_URL}/ventas`, { idProducto, cantidad });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
