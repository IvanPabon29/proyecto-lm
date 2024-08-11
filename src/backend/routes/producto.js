// backend/routes/producto.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const multer = require('multer');
const path = require('path');


// Configuración de multer para almacenar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombra el archivo para evitar conflictos.  El archivo se renombra usando la fecha actual para evitar conflictos con archivos que tengan el mismo nombre.
  }
});

const upload = multer({ storage: storage });

//* Ruta para registrar productos
router.post('/registro-entrada/nuevo-producto', upload.single('imagen'), productoController.agregarProducto);

//* Ruta para obtener productos
router.get('/productos', productoController.obtenerProductos);


module.exports = router;
