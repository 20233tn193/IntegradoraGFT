import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./TournamentDetails.css";

import axiosInstance from "../../api/axiosInstance"; // ✅ usar instancia con token
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

import trofeo from "../../assets/trophy-icon.png";
import balon from "../../assets/balon-fuego.png";
import rayo from "../../assets/rayo.png";
import cards from "../../assets/cards.png";
import yellow from "../../assets/yellow.png";
import red from "../../assets/red.png";
import topImage from "../../assets/Top.png";

const TournamentDetails = () => {
  const navigate = useNavigate();
  const { torneoId } = useParams();
  const [chunkIndex, setChunkIndex] = useState(0);
  const [topScorers, setTopScorers] = useState([]);

  useEffect(() => {
    const fetchTopScorers = async () => {
      try {
        const response = await axiosInstance.get(`/estadisticas/goleadores/${torneoId}`);
        console.log("Máximos goleadores:", response.data);

        const formateados = response.data.map((item) => ({
          name: `${item.nombre} ${item.apellido}`,
          goals: item.goles,
          playerImg: item.fotoUrl || "https://placehold.co/120x120?text=Jugador",
          teamImg: `https://placehold.co/50x50?text=EQ`, // puedes mejorar con escudo real
        }));

        setTopScorers(formateados);
      } catch (error) {
        console.error("Error al obtener los datos del torneo:", error);
      }
    };

    if (torneoId) {
      fetchTopScorers();
    }
  }, [torneoId]);

  const torneo = {
    name: "Torneo de Veteranos",
    nextMatch: { teamA: "Juventus", teamB: "Real Madrid" },
    cards: [
      { name: "Player 1", team: "Real Madrid", yellow: 2, red: 0, img: "https://placehold.co/40x40?text=P1" },
      { name: "Player 2", team: "Real Madrid", yellow: 1, red: 0, img: "https://placehold.co/40x40?text=P2" },
      { name: "Player 3", team: "Juventus", yellow: 3, red: 1, img: "https://placehold.co/40x40?text=P3" },
    ],
    stats: [
      { team: "Real Madrid", points: 14 },
      { team: "Juventus", points: 13 },
      { team: "Borussia Dortmund", points: 12 },
    ],
  };

  const chunkSize = 3;
  const totalChunks = Math.ceil(topScorers.length / chunkSize);
  const currentPlayers = topScorers.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);

  const handleNext = () => {
    if (chunkIndex < totalChunks - 1) {
      setChunkIndex(chunkIndex + 1);
    }
  };

  const handlePrev = () => {
    if (chunkIndex > 0) {
      setChunkIndex(chunkIndex - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-background" style={{ backgroundImage: `url(${topImage})` }}></div>

      <div className="details-dashboard">
        <h2 className="main-title">{torneo.name}</h2>

        <div className="row">
          <div className="card scorers-dark-card">
            <div className="scorer-header">
              <img className="trofeo" src={trofeo} alt="Trophy" />
              <h3 className="section-title">Máximos Goleadores</h3>
            </div>

            <div className="scorer-chunk-wrapper" key={chunkIndex}>
              {currentPlayers.map((scorer, i) => {
                const rank = chunkIndex * chunkSize + (i + 1);
                return (
                  <div key={rank} className="scorer-card-chunk">
                    <div className="left-rank-bar"><span className="rank-number">{rank}</span></div>
                    <img src={scorer.teamImg} alt="Team" className="team-badge" />
                    <div className="photo-wrapper">
                      <img src={scorer.playerImg} alt={scorer.name} className="player-photo" />
                    </div>
                    <div className="player-name">{scorer.name}</div>
                    <div className="goals-circle">
                      <span className="goals-count">{scorer.goals}</span>
                      <span className="goals-text">Goles</span>
                    </div>
                  </div>
                );
              })}

              {chunkIndex > 0 && (
                <div className="scorer-arrow left-arrow">
                  <button className="btn btn-light rounded-circle arrow-btn" onClick={handlePrev}>
                    <Icon path={mdiChevronRight} size={1.2} color="black" />
                  </button>
                </div>
              )}
              {chunkIndex < totalChunks - 1 && (
                <div className="scorer-arrow right-arrow">
                  <button className="btn btn-light rounded-circle arrow-btn" onClick={handleNext}>
                    <Icon path={mdiChevronRight} size={1.2} color="black" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="card card-partido" onClick={() => navigate(`/upcoming-matches/${torneoId}`)} style={{ cursor: "pointer" }}>
            <div className="partido-header">
              <img className="balon-fuego" src={balon} alt="balon" />
              <h3 className="section-title-vs">Próximo Partido</h3>
            </div>
            <div className="container-vs">
              <div className="equipo">
                <img src="https://placehold.co/50x50?text=J" alt={torneo.nextMatch.teamA} className="equipo-img" />
                <span className="equipo-nombre">{torneo.nextMatch.teamA}</span>
              </div>
              <div className="vs-center">
                <div className="vs-circle">VS</div>
                <img src={rayo} alt="rayo" className="rayo" />
              </div>
              <div className="equipo">
                <img src="https://placehold.co/50x50?text=RM" alt={torneo.nextMatch.teamB} className="equipo-img" />
                <span className="equipo-nombre">{torneo.nextMatch.teamB}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <div className="tarjetas-header">
              <img src={cards} alt="cards" />
              <h3 className="section-title">Tarjetas</h3>
            </div>
            {torneo.cards.map((player, index) => (
              <div key={index} className="card-player">
                <div className="left-info">
                  <span className="rank-number-cards">{index + 1}</span>
                  <img src={player.img} alt={player.name} className="card-avatar" />
                  <div className="player-name-cards"><span>{player.name}</span></div>
                </div>
                <div className="card-info">
                  <div className="card-count-group">
                    <div className="card-count yellow">
                      <span className="yellow-card-info"><img src={yellow} alt="tarjeta amarilla" /><strong>{player.yellow}</strong></span>
                    </div>
                    <div className="card-count red">
                      <span className="yellow-card-info"><img src={red} alt="tarjeta roja" /><strong>{player.red}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="card-team">
                  <div className="team-text">
                    <span className="equipo-label">Equipo:</span>
                    <span className="equipo-nombre">{player.team}</span>
                  </div>
                  <img src="https://placehold.co/30x30?text=EQ" alt="team" className="equipo-img" />
                </div>
              </div>
            ))}
          </div>

          <div className="card standings-card">
            <div className="standings-header">
              <img className="trofeo" src={trofeo} alt="Trophy" />
              <h3 className="section-title">Tabla de Posiciones</h3>
            </div>
            <div className="standings-wrapper">
              {torneo.stats.slice(0, 3).map((item, index) => (
                <div key={index} className="standings-item">
                  <div className="rank-bar"><span className="rank-number">{index + 1}</span></div>
                  <img src={`https://placehold.co/50x50?text=${item.team.charAt(0)}`} alt="Escudo" className="team-badge-goleador" />
                  <div className="team-name">{item.team}</div>
                  <div className="points-circle">
                    <span className="points-number">{item.points}</span>
                    <span className="points-text">Puntos</span>
                  </div>
                </div>
              ))}
              <div className="scorer-arrow right-arrow">
                <button
                  type="button"
                  className="btn btn-light rounded-circle text-dark arrow-btn"
                  onClick={() => navigate("/dashboard-statistics")}
                >
                  <Icon path={mdiChevronRight} size={1.2} color="black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentDetails;