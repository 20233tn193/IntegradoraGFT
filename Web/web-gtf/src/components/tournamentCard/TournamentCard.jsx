import React from "react";
import "./TournamentCard.css"; // Estilos de la tarjeta

const TournamentCard = ({ image, name, clubs, date, status }) => {
  // ✅ Asignar color dinámico según el estado
  const getStatusClass = (status) => {
    const formattedStatus = status.toLowerCase();

    if (formattedStatus.includes("activo")) return "status activo";
    if (formattedStatus.includes("finalizado")) return "status finalizado";
    if (formattedStatus.includes("abierto")) return "status abierto";

    return "status"; // Clase por defecto
  };

  return (
    <div className="tournament-card">
      {/* ✅ Imagen del torneo (Encima, centrado) */}
      <div className="tournament-image-container">
        <img src={image} alt={name} className="tournament-image" />
      </div>

      {/* ✅ Información del torneo */}
      <div className="tournament-info">
        <h3>{name}</h3>
        <p>{clubs} clubes</p>
        <p>{date}</p>
        {/* ✅ Estado del torneo (Abajo, dinámico) */}
        <p className={getStatusClass(status)}>{status}</p>
      </div>
    </div>
  );
};

export default TournamentCard;