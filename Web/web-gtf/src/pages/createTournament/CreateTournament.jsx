import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTournament.css";

const CreateTournament = () => {
  const navigate = useNavigate();
  const [tournament, setTournament] = useState({
    name: "",
    teams: "",
    status: "ABIERTO",
    date: "",
  });

  const handleChange = (e) => {
    setTournament({ ...tournament, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Torneo Creado:", tournament);
    navigate("/"); // Redirige al Dashboard después de crear el torneo
  };

  return (
    <div className="create-tournament-container">
      <h2 className="title">
        <span role="img" aria-label="trophy">🏆</span> Crear Torneo
      </h2>
      <form className="tournament-form" onSubmit={handleSubmit}>
        <div className="left-section">
          <div className="image-placeholder"></div>
          <button className="change-image-btn">Cambiar imagen</button>
        </div>

        <div className="right-section">
          <label>Nombre del Torneo: *</label>
          <input
            type="text"
            name="name"
            value={tournament.name}
            onChange={handleChange}
            required
          />

          <label>Número de equipos: *</label>
          <input
            type="number"
            name="teams"
            value={tournament.teams}
            onChange={handleChange}
            required
          />

          <label>Estado: *</label>
          <select name="status" value={tournament.status} onChange={handleChange}>
            <option value="ABIERTO">ABIERTO</option>
            <option value="ACTIVO">ACTIVO</option>
            <option value="FINALIZADO">FINALIZADO</option>
          </select>

          <label>Fecha de inicio: *</label>
          <input
            type="date"
            name="date"
            value={tournament.date}
            onChange={handleChange}
            required
          />

          <div className="button-group">
            <button type="submit" className="create-btn">CREAR</button>
          </div>
          <div>
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>CANCELAR</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTournament;