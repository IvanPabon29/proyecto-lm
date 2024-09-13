// backend/controllers/productoController.js
const db = require("../db");

const productoController = {
  // Controlador del registro de productos.
  agregarProducto: (req, res) => {
    const {
      idProveedor,
      idUsuario,
      idProducto,
      nombre,
      modelo,
      descripcion,
      cantidad,
      precio,
    } = req.body;

    // URL IMAGEN
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    const query = `
      INSERT INTO registros_de_entrada 
      (imagen, id_proveedor, id_usuario, id_producto, nombre, modelo, descripcion, cantidad, precio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        imagen,
        idProveedor,
        idUsuario,
        idProducto,
        nombre,
        modelo,
        descripcion,
        cantidad,
        precio,
      ],
      (err, results) => {
        if (err) {

          console.error("Error al registrar el producto:", err.message); // Verifica si hay errores en la consulta SQL

          return res
            .status(500)
            .send({ message: "Error al registrar el producto", error: err });
        }
        res.status(201).json({ message: "Producto registrado exitosamente" });
      }
    );
  },

  // Controlador para obtener todos los productos.
  obtenerProductos: (req, res) => {
    const query = "SELECT * FROM registros_de_entrada";
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  },

  // Controlador para Restar productos del inventario
  restarProducto: (req, res) => {
    const { idProducto, cantidad } = req.body;

    const query = `
        UPDATE registros_de_entrada 
        SET cantidad = cantidad - ? 
        WHERE id_producto = ?
      `;

    db.query(query, [cantidad, idProducto], (err, results) => {
      if (err) {
        console.error("Error al restar producto:", err.message);
        return res
          .status(500)
          .send({ message: "Error al actualizar el inventario", error: err });
      }
      res.status(200).json({ message: "Inventario actualizado correctamente" });
    });
  },
};

module.exports = productoController;
