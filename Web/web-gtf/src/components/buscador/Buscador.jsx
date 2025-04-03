// src/components/buscador/Buscador.jsx
import React from "react";
import "./Buscador.css";
import lupaIcon from "../../assets/lupa.png";

const Buscador = ({ value, onChange, onBuscar, placeholder = "Buscar..." }) => {
  return (
    <div className="buscador-wrapper">
      <img src={lupaIcon} alt="buscar" className="buscador-icono" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="buscador-input"
      />
      <button className="buscador-boton" onClick={onBuscar}>
        Buscar
      </button>
    </div>
  );
};

export default Buscador;