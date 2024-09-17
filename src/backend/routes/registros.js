// Define las rutas de la API para las operaciones de los registros de productos.

const express = require('express');
const router = express.Router();
const registrosController = require('../controllers/registrosController');
const obtenerRegistros = require('../controllers/registrosController');


// Ruta para registrar una venta
router.post('/ventas', registrosController.registrarVenta);

// Ruta para obtener registros filtrados por fechas
router.get('/registros', registrosController.obtenerRegistros);

module.exports = router;

