import React, { useState } from "react";
import { obtenerRegistros } from "../api/registrosApi";
import "../styles/Registros.css";

function Registros() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [registros, setRegistros] = useState([]);

  // Manejar filtro de fechas
  const handleFiltrar = async () => {
    try {
      const registrosFiltrados = await obtenerRegistros(fechaInicio, fechaFin);
      setRegistros(registrosFiltrados);
    } catch (error) {
      console.error("Error al filtrar los registros:", error);
    }
  };

  // Formatea la fecha en formato (DD/MM/AA)
  const formatFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return nuevaFecha.toLocaleDateString();
  };

  return (
    <section id="registros">
      <div className="contr-titulo">
        <h1 className="titulo-registro">Registros</h1>
      </div>

      <div className="contenedor-list-registro">
        {/* Filtrar por fecha */}
        <div className="contenedor-filtro">
          <h1 className="t-filtrar">Filtrar</h1>
          <label htmlFor="fechaInicio">Fecha Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            name="fecha-inicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          <label htmlFor="fechaFin">Fecha Fin:</label>
          <input
            type="date"
            id="fechaFin"
            name="fecha-fin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />

          <button className="boton-filtrar" onClick={handleFiltrar}>
            Filtrar
          </button>
        </div>

        {/* Tabla de registros */}
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Id Producto</th>
                <th className="col-nombre">Nombre de Producto</th>
                <th className="col-modelo">Modelo</th>
                <th>Fecha (DD/MM/AA)</th>
                <th>Cantidad</th>
                <th>Tipo Accion</th>
              </tr>
            </thead>
            <tbody>
              {registros.length > 0 ? (
                registros.map((registro, index) => (
                  <tr key={index}>
                    <td>{registro.id_producto}</td>
                    <td>{registro.nombre}</td>
                    <td>{registro.modelo}</td>
                    <td>{formatFecha(registro.fecha_registro)}</td>
                    <td>{registro.cantidad}</td>
                    <td>{registro.tipo_accion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No se encontraron registros</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Registros;
