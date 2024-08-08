// Conexion a la base de datos.
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',      // El host donde corre tu servidor MySQL
    user: 'root',     // El usuario de tu base de datos
    password: 'LMuser2000', // La contraseña de tu base de datos
    database: 'proyecto_lm', // El nombre de tu base de datos
    port: 3306  //Puerto
});

connection.connect((err) => {
    if (err) {
      console.error('Error conectando a MySQL:', err);
      return;
    }
    console.log('Conexion exitosa a MySQL');
});
  
module.exports = connection;

