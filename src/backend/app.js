// *Se crea el servidor con la libreria express .

// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const proveedoresRoutes = require('./routes/proveedores'); 
const productoRoutes = require('./routes/producto');
const registrosRoutes = require('./routes/registros');


// creamos el servidor con express
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Servir la carpeta uploads como archivos estáticos
app.use('/uploads', express.static(__dirname + '/uploads'));

// Verificar de middleware 
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}, Method: ${req.method}`);
  next();
});


// Rutas usuarios
app.use('/api', userRoutes);

// Ruta Proveedores
app.use('/api', proveedoresRoutes); 

// Ruta Producto
app.use('/api', productoRoutes);

// Ruta de registros
app.use('/api', registrosRoutes);

// Puerto y mensaje
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
