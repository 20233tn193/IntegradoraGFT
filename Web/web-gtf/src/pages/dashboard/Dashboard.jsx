import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import TournamentCard from "../../components/tournamentCard/TournamentCard";
import Buscador from "../../components/buscador/Buscador";
import "./Dashboard.css";
import trophyIcon from "../../assets/trophy-icon.png";
import { useNavigate } from "react-router-dom";
import topImage from "../../assets/Top.png";

const Dashboard = () => {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const tournaments = [
    {
      image: "https://placehold.co/150x150",
      name: "Torneo ABC",
      clubs: 10,
      date: "05/03/2025",
      status: "ACTIVO",
    },
    {
      image: "https://placehold.co/150x150",
      name: "Torneo de Veteranos",
      clubs: 10,
      date: "05/03/2025",
      status: "FINALIZADO",
    },
    {
      image: "https://placehold.co/150x150",
      name: "Torneo Infantil",
      clubs: 10,
      date: "05/03/2025",
      status: "ABIERTO",
    },
    {
      image: "https://placehold.co/150x150",
      name: "Torneo Estatal",
      clubs: 10,
      date: "05/03/2025",
      status: "ACTIVO",
    },
    {
      image: "https://placehold.co/150x150",
      name: "Copa Nacional",
      clubs: 16,
      date: "15/04/2025",
      status: "FINALIZADO",
    },
    {
      image: "https://placehold.co/150x150",
      name: "Torneo Primavera",
      clubs: 12,
      date: "10/06/2025",
      status: "ABIERTO",
    },
    {
      image: "https://placehold.co/150x150",
      name: "Super Liga",
      clubs: 20,
      date: "22/08/2025",
      status: "ACTIVO",
    },
  ];

  const filteredTournaments = tournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      tournament.status.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Navbar />
      <div
        className="dashboard-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>

      <div className="dashboard-content">
        <div className="header-container">
          <div className="dashboard-titulo-torneos">
            <img src={trophyIcon} alt="icon" />
            <span>Torneos</span>
          </div>

          <Buscador
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBuscar={() => console.log("Buscar:", busqueda)}
          />
        </div>

        <div className="tournament-list-wrapper">
          <div className="tournament-list">
            {filteredTournaments.map((tournament, index) => (
              <div
                key={index}
                onClick={() => navigate(`/torneo/${index}`)}
                style={{ cursor: "pointer" }}
              >
                <TournamentCard {...tournament} />
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Dashboard;
