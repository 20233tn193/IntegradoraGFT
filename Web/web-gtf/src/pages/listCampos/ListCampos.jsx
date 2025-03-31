import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./DashboardStatistics.css";
import searchIcon from "../../assets/lupa.png";
import campos from "../../assets/campo.png";

const DashboardStatistics = () => {
  const location = useLocation(); // ✅ dentro del componente
  const torneo = location.state;

  const [searchTerm, setSearchTerm] = useState("");

  const teams = [
    {
      name: "Real Madrid",
      logo: "https://placehold.co/30x30?text=RM",
      phase: "Octavos",
      stats: {
        pj: 3,
        g: 2,
        e: 1,
        p: 0,
        gf: 7,
        gc: 3,
        dg: 4,
        pts: 7,
      },
    },
    {
      name: "Juventus",
      logo: "https://placehold.co/30x30?text=JUV",
      phase: "Cuartos",
      stats: {
        pj: 3,
        g: 1,
        e: 1,
        p: 1,
        gf: 5,
        gc: 5,
        dg: 0,
        pts: 4,
      },
    },
  ];
  const [selectedPhase, setSelectedPhase] = useState("");

  const filteredTeams = teams.filter((team) => {
    return selectedPhase === "" || team.phase === selectedPhase;
  });

  return (
    <div className="dashboard-statistics">
      <Navbar />
      <div className="statistics-content">
        <div className="statistics-header">
          <div className="statistics-title">
            <img src={campos} alt="Trophy" className="trophy-icon" />
            {/* ✅ Mostrar nombre del torneo */}
            <span>Campos - {torneo?.name || "Torneo"}</span>
          </div>

          <div className="statistics-search">
            <img src={searchIcon} alt="Buscar" className="search-icon" />
            <input
              type="text"
              placeholder="Buscar equipo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Buscar</button>
          </div>
        </div>

        <div className="statistics-table">
          <div className="statistics-header-row">
            <span>Campos</span>
            <span>Cancha 1</span>
            <span>Ver más</span>
            <span>Ubicación</span>
            <span>Acciones</span>
          </div>

          {filteredTeams.map((team, index) => (
            <div key={index} className="statistics-row">
              <div className="team-name">
                <img src={team.logo} alt="logo" />
                <span className="italic-name">{team.name}</span>
              </div>

              <span>{team.stats.p}</span>
              <span>{team.stats.gf}</span>
              <span>{team.stats.gc}</span>
              <span>{team.stats.dg}</span>
              <span>{team.stats.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistics;
