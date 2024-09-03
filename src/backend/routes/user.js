// Define las rutas de la API para las operaciones de ingresar los usuarios.

// backend/routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta login.
router.post('/login', userController.login);

// Ruta registrar usuarios.
router.post('/nuevo-usuario', userController.registroUsuario);

// Ruta para modificar el perfil del usuario
router.put('/mi-perfil/modificar-perfil', userController.modificarPerfil);


module.exports = router; 
 