// Define las rutas de la API para las operaciones de los proveedores.

const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');

// Rutas de proveedores

//* Ruta para registralos.
router.post('/proveedores', proveedoresController.registroProveedor);

//* Ruta para obtener
router.get('/proveedores', proveedoresController.obtenerProveedores);

//* Ruta para eliminar proveedores
router.delete('/proveedores/:id', proveedoresController.eliminarProveedor);


module.exports = router;
