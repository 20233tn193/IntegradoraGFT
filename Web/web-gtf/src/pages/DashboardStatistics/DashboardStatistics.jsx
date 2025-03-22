import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./DashboardStatistics.css";
import searchIcon from "../../assets/lupa.png"; // icono de búsqueda
import trophyIcon from "../../assets/trophy-icon.png"; // icono del título
const madridIcon = "https://placehold.co/30x30?text=RM";

const DashboardStatistics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const teams = Array(8).fill({
    name: "Real Madrid",
    logo: madridIcon,
    stats: {
      pj: 0,
      g: 0,
      e: 0,
      p: 0,
      gf: 0,
      gc: 0,
      dg: 0,
      pts: 0,
    },
  });

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-statistics">
      <Navbar />
      <div className="statistics-content">

        <div className="statistics-header">
          <div className="statistics-title">
            <img src={trophyIcon} alt="Trophy" className="trophy-icon" />
            <span>Estadísticas</span>
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
                <span>{team.name}</span>
              </div>
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
