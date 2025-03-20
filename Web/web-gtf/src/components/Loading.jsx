import React from "react";
import "./Loading.css";

// Importar imágenes desde `src/assets/`
import topImage from "../assets/Top.png";
import bottomImage from "../assets/Botton.png";
import logo from "../assets/Logo.png";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      {/* Fondo superior con imagen importada */}
      <div className="login-background" style={{ backgroundImage: `url(${topImage})` }}></div>

      {/* Contenido principal */}
      <div className="loading-container">
        <div className="loading-content">
          <img src={logo} alt="Logo" className="loading-logo" />
          <h1>
            <span className="gtf-red">GTF</span>
            <span className="gtf-blue"> Sistema de Gestión de Torneos de Fútbol</span>
          </h1>
        </div>
      </div>

      {/* Fondo inferior con imagen importada */}
      <div className="login-background-bottom" style={{ backgroundImage: `url(${bottomImage})` }}></div>
    </div>
  );
};

export default Loading;