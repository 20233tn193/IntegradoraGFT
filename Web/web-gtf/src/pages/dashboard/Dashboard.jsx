import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/navbar/Navbar";
import TournamentCard from "../../components/tournamentCard/TournamentCard";
import Buscador from "../../components/buscador/Buscador";
import "./Dashboard.css";
import trophyIcon from "../../assets/trophy-icon.png";
import { useNavigate } from "react-router-dom";
import topImage from "../../assets/Top.png";
import Loading from "../../components/loading/Loading"; // ✅ Agregado

const Dashboard = () => {
  const [busqueda, setBusqueda] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axiosInstance.get("/torneos");
        setTournaments(response.data);
      } catch (error) {
        console.error("Error al obtener torneos:", error);
      } finally {
        setLoading(false); // ✅ Ocultar loader
      }
    };

    fetchTournaments();
  }, []);

  const filteredTournaments = tournaments.filter((tournament) => {
    const name = tournament.nombreTorneo || "";
    const status = tournament.estado || "";
    return (
      name.toLowerCase().includes(busqueda.toLowerCase()) ||
      status.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <div className="dashboard">
      <Navbar />
      <div
        className="dashboard-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>

      {loading ? (
        <Loading />
      ) : (
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
                  onClick={() => navigate(`/torneo/${tournament.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <TournamentCard
                    image={tournament.logoSeleccionado || "https://placehold.co/150x150?text=Torneo"}
                    name={tournament.nombreTorneo}
                    clubs={tournament.numeroEquipos}
                    date={tournament.fechaInicio}
                    status={tournament.estado}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;