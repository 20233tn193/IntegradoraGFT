// src/components/buscador/Buscador.jsx
import React from "react";
import "./Buscador.css";
import lupaIcon from "../../assets/lupa.png";

const Buscador = ({ value, onChange, onSearch, placeholder = "Buscar..." }) => {
  return (
    <div className="buscador-container">
      <img src={lupaIcon} alt="buscar" className="lupa-icon" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button onClick={onSearch}>Buscar</button>
    </div>
  );
};

export default Buscador;