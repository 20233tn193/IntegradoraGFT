import React from "react";
import "./Paginador.css";

const Paginador = ({ totalPaginas, paginaActual, cambiarPagina }) => {
  if (totalPaginas <= 1) return null;

  return (
    <div className="paginador-container">
      {[...Array(totalPaginas)].map((_, i) => (
        <button
          key={i}
          className={`page-button ${paginaActual === i + 1 ? "active" : ""}`}
          onClick={() => cambiarPagina(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginador;