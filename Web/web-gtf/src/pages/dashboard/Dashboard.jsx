import React from "react";
import Navbar from "../../components/navbar/Navbar";
import TournamentCard from "../../components/tournamentCard/TournamentCard";
import "./Dashboard.css";
import trophyIcon from "../../assets/trophy-icon.png"; 

const Dashboard = () => {
  const tournaments = [
    { image: "https://placehold.co/120x120", name: "Torneo ABC", clubs: 10, date: "05/03/2025", status: "ACTIVO" },
    { image: "https://placehold.co/120x120", name: "Torneo de Veteranos", clubs: 10, date: "05/03/2025", status: "FINALIZADO" },
    { image: "https://placehold.co/120x120", name: "Torneo Infantil", clubs: 10, date: "05/03/2025", status: "ABIERTO" },
    { image: "https://placehold.co/120x120", name: "Torneo Estatal", clubs: 10, date: "05/03/2025", status: "ACTIVO" },
    { image: "https://placehold.co/120x120", name: "Copa Nacional", clubs: 16, date: "15/04/2025", status: "FINALIZADO" },
    { image: "https://placehold.co/120x120", name: "Torneo Primavera", clubs: 12, date: "10/06/2025", status: "ABIERTO" },
    { image: "https://placehold.co/120x120", name: "Super Liga", clubs: 20, date: "22/08/2025", status: "ACTIVO" },
  ];

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        {/* ✅ Título "TORNEOS" con icono de trofeo */}
        <div className="tournament-title">
          <img src={trophyIcon} alt="Trophy" className="trophy-icon" />
          <h2 className="tournament-text">TORNEOS</h2>
        </div>

        {/* ✅ Lista de torneos */}
        <div className="tournament-list-wrapper">
          <div className="tournament-list">
            {tournaments.map((tournament, index) => (
              <TournamentCard key={index} {...tournament} />
            ))}
          </div>
        </div>

        <button className="add-button">AGREGAR</button>
      </div>
    </div>
  );
};

export default Dashboard;