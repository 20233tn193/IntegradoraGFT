import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./DashboardStatistics.css";
import searchIcon from "../../assets/lupa.png";
import trophyIcon from "../../assets/trophy-icon.png";

const madridIcon = "https://placehold.co/30x30?text=RM";

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
    {
      name: "Borussia Dortmund",
      logo: "https://placehold.co/30x30?text=BVB",
      phase: "Semifinal",
      stats: {
        pj: 3,
        g: 0,
        e: 2,
        p: 1,
        gf: 2,
        gc: 4,
        dg: -2,
        pts: 2,
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
            <img src={trophyIcon} alt="Trophy" className="trophy-icon" />
            {/* ✅ Mostrar nombre del torneo */}
            <span>Estadísticas - {torneo?.name || "Torneo"}</span>
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
            <span>Equipo</span>

            {/* Select para filtrar por fase */}
            <select
              className="form-select phase-select"
              aria-label="Filtrar por fase"
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="Final">Final</option>
              <option value="Semifinal">Semifinal</option>
              <option value="Cuartos">Cuartos</option>
              <option value="Octavos">Octavos</option>
            </select>

            <span>PJ</span>
            <span>G</span>
            <span>E</span>
            <span>P</span>
            <span>GF</span>
            <span>GC</span>
            <span>DG</span>
            <span>PTs</span>
          </div>

          {filteredTeams.map((team, index) => (
            <div key={index} className="statistics-row">
              <div className="team-name">
                <img src={team.logo} alt="logo" />
                <span className="italic-name">{team.name}</span>
              </div>

              {/* Select de fase */}
              <select className="fase-select" value={team.phase} disabled>
                <option>Final</option>
                <option>Semifinal</option>
                <option>Cuartos</option>
                <option>Octavos</option>
              </select>

              <span>{team.stats.pj}</span>
              <span>{team.stats.g}</span>
              <span>{team.stats.e}</span>
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
