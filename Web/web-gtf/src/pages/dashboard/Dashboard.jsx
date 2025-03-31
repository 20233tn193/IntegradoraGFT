import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import TournamentCard from "../../components/tournamentCard/TournamentCard";
import "./Dashboard.css";
import trophyIcon from "../../assets/trophy-icon.png"; 
import searchIcon from "../../assets/lupa.png"; 
import { useNavigate } from "react-router-dom";
import topImage from "../../assets/Top.png"

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const tournaments = [
    { image: "https://placehold.co/150x150", name: "Torneo ABC", clubs: 10, date: "05/03/2025", status: "ACTIVO" },
    { image: "https://placehold.co/150x150", name: "Torneo de Veteranos", clubs: 10, date: "05/03/2025", status: "FINALIZADO" },
    { image: "https://placehold.co/150x150", name: "Torneo Infantil", clubs: 10, date: "05/03/2025", status: "ABIERTO" },
    { image: "https://placehold.co/150x150", name: "Torneo Estatal", clubs: 10, date: "05/03/2025", status: "ACTIVO" },
    { image: "https://placehold.co/150x150", name: "Copa Nacional", clubs: 16, date: "15/04/2025", status: "FINALIZADO" },
    { image: "https://placehold.co/150x150", name: "Torneo Primavera", clubs: 12, date: "10/06/2025", status: "ABIERTO" },
    { image: "https://placehold.co/150x150", name: "Super Liga", clubs: 20, date: "22/08/2025", status: "ACTIVO" },
  ];

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-background" style={{ backgroundImage: `url(${topImage})` }}></div>
      
      <div className="dashboard-content">
        
        <div className="header-container">
          <div className="tournament-title">
            <img src={trophyIcon} alt="Trophy" className="trophy-icon" />
            <h2 className="tournament-text">TORNEOS</h2>
          </div>

          <div className="search">
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar torneo o estado"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={searchIcon} alt="Buscar" className="search-icon" />
            </form>
          </div>
        </div>

        {/* ✅ Lista de torneos filtrada y clicable */}
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

        <button className="add-button" onClick={() => navigate("/crear-torneo")}>
          AGREGAR
        </button>
      </div>
    </div>
  );
};

export default Dashboard;