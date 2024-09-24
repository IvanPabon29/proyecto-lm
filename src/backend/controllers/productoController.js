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

    // Comienza una transacción para asegurar consistencia entre la inserción en ambas tablas
    db.beginTransaction((err) => {
      if (err) {
        return res.status(500).send({ message: "Error iniciando la transacción", error: err });
      }

      const queryProducto = `
        INSERT INTO registros_de_entrada 
        (imagen, id_proveedor, id_usuario, id_producto, nombre, modelo, descripcion, cantidad, precio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Primero se inserta el producto en la tabla de entrada
      db.query(
        queryProducto,
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
            // Si hay un error, se revierte la transacción
            return db.rollback(() => {
              console.error("Error al registrar el producto:", err.message);
              return res.status(500).send({ message: "Error al registrar el producto", error: err });
            });
          }

          // Ahora registramos el ingreso en la tabla "registros"
          const queryRegistro = `
            INSERT INTO registros (id_producto, nombre, modelo, cantidad, tipo_accion)
            VALUES (?, ?, ?, ?, ?)
          `;

          db.query(
            queryRegistro,
            [idProducto, nombre, modelo, cantidad, "ingreso"],
            (err, results) => {
              if (err) {
                // Si hay un error en la segunda inserción, se revierte todo
                return db.rollback(() => {
                  console.error("Error al registrar el ingreso:", err.message);
                  return res.status(500).send({ message: "Error al registrar el ingreso", error: err });
                });
              }

              // Si todo va bien, se confirma la transacción
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error("Error al hacer commit:", err.message);
                    return res.status(500).send({ message: "Error al confirmar la transacción", error: err });
                  });
                }
                res.status(201).json({ message: "Producto e ingreso registrados exitosamente" });
              });
            }
          );
        }
      );
    });
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
