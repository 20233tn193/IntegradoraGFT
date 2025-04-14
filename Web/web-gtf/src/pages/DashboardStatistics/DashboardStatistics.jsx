import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Buscador from "../../components/buscador/Buscador";
import axiosInstance from "../../api/axiosInstance";
import "./DashboardStatistics.css";
import topImage from "../../assets/Top.png";
import trophyIcon from "../../assets/trophy-icon.png";
import Loading from "../../components/loading/Loading"; // ✅ Importación

const DashboardStatistics = () => {
  const location = useLocation();
  const torneo = location.state;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTablaPosiciones = async () => {
      try {
        if (!torneo?.id) {
          console.warn("No se recibió el ID del torneo");
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get(`/estadisticas/tabla-posiciones/${torneo.id}`);
        setTeams(response.data);
      } catch (error) {
        console.error("Error al cargar la tabla de posiciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTablaPosiciones();
  }, [torneo]);

  const filteredTeams = teams.filter((team) => {
    const matchesPhase = selectedPhase === "" || team.fase === selectedPhase;
    const matchesSearch = team.nombreEquipo?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div
        className="dashboard-stadistic-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>

      {loading ? (
        <Loading /> // ✅ Ahora está en el mismo nivel que otras pantallas
      ) : (
        <div className="estadisticas-container">
          <div className="estadisticas-header">
            <div className="estadisticas-title">
              <img src={trophyIcon} alt="icono" />
              <span>Estadísticas</span>
            </div>

            <Buscador
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBuscar={() => console.log("Buscar:", searchTerm)}
            />
          </div>

          {teams.length === 0 ? (
            <p style={{ color: "black", fontSize: "18px", marginTop: "30px" }}>
              No hay datos para mostrar.
            </p>
          ) : (
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
                  <option value="Ronda 2 G">Ronda 2 G</option>
                </select>
                <span title="Partidos Jugados">PJ</span>
                <span title="Ganados">G</span>
                <span title="Empatados">E</span>
                <span title="Perdidos">P</span>
                <span title="Goles a Favor">GF</span>
                <span title="Goles en Contra">GC</span>
                <span title="Diferencia de Goles">DG</span>
                <span title="Puntos">Pts</span>
              </div>

              {filteredTeams.map((team, i) => (
                <div key={i} className="estadisticas-fila">
                  <div className="team-nombre">
                    <img src={team.logoUrl || "https://placehold.co/30x30?text=EQ"} alt="logo" />
                    <span>{team.nombreEquipo}</span>
                  </div>
                  <span>{team.fase}</span>
                  <span>{team.partidosJugados}</span>
                  <span>{team.ganados}</span>
                  <span>{team.empatados || 0}</span>
                  <span>{team.perdidos}</span>
                  <span>{team.golesFavor}</span>
                  <span>{team.golesContra}</span>
                  <span>{team.diferenciaGoles}</span>
                  <span>{team.puntos}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardStatistics;