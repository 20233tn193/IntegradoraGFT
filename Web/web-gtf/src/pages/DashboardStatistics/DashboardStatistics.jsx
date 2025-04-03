import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Buscador from "../../components/buscador/Buscador";
import "./DashboardStatistics.css";
import topImage from "../../assets/Top.png";
import trophyIcon from "../../assets/trophy-icon.png";

const DashboardStatistics = () => {
  const location = useLocation();
  const torneo = location.state;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("");

  const teams = [
    {
      name: "Real Madrid",
      logo: "https://placehold.co/30x30?text=RM",
      phase: "Octavos",
      stats: { pj: 3, g: 2, e: 1, p: 0, gf: 7, gc: 3, dg: 4, pts: 7 },
    },
    {
      name: "Juventus",
      logo: "https://placehold.co/30x30?text=JUV",
      phase: "Cuartos",
      stats: { pj: 3, g: 1, e: 1, p: 1, gf: 5, gc: 5, dg: 0, pts: 4 },
    },
    {
      name: "Borussia Dortmund",
      logo: "https://placehold.co/30x30?text=BVB",
      phase: "Semifinal",
      stats: { pj: 3, g: 0, e: 2, p: 1, gf: 2, gc: 4, dg: -2, pts: 2 },
    },
  ];

  const filteredTeams = teams.filter((team) => {
    const matchesPhase = selectedPhase === "" || team.phase === selectedPhase;
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div
        className="dashboard-stadistic-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>

      <div className="estadisticas-container">
        <div className="estadisticas-header">
          <div className="estadisticas-title">
            <img src={trophyIcon} alt="icono" />
            <span>Estadísticas - {torneo?.name || "Torneo"}</span>
          </div>

          <Buscador
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBuscar={() => console.log("Buscar:", searchTerm)}
          />
        </div>

        <div className="estadisticas-tabla">
          <div className="estadisticas-cabecera">
            <span>Equipo</span>
            <select
              className="fase-select"
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="Final">Final</option>
              <option value="Semifinal">Semifinal</option>
              <option value="Cuartos">Cuartos</option>
              <option value="Octavos">Octavos</option>
            </select>
            <span title="Partidos Jugados">PJ</span>
            <span title="Partidos Ganados">G</span>
            <span title="Partidos Empatados">E</span>
            <span title="Partidos Perdidos">P</span>
            <span title="Goles a Favor">GF</span>
            <span title="Goles en Contra">GC</span>
            <span title="Diferencia de Goles">DG</span>
            <span title="Puntos Totales">Pts</span>
          </div>

          {filteredTeams.map((team, i) => (
            <div key={i} className="estadisticas-fila">
              <div className="team-nombre">
                <img src={team.logo} alt="logo" />
                <span>{team.name}</span>
              </div>
              <span>{team.phase}</span>
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
    </>
  );
};

export default DashboardStatistics;