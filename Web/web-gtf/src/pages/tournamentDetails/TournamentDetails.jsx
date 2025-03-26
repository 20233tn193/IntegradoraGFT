import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ✅ Importamos el Navbar y el CSS
import Navbar from "../../components/navbar/Navbar";
import "./TournamentDetails.css";

import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
// mdiChevronLeft si quieres también flecha izquierda

// ✅ Importamos un icono (trofeo) para ilustrar en la UI
import trofeo from "../../assets/trophy-icon.png";
import balon from "../../assets/balon-fuego.png";
import rayo from "../../assets/rayo.png";
import cards from "../../assets/cards.png";
import yellow from "../../assets/yellow.png";
import red from "../../assets/red.png";



const TournamentDetails = () => {

  const navigate = useNavigate();

  // 🔒 Controlamos la navegación con useNavigate (para cambiar de pantalla si quieres)
 
  // 🔖 chunkIndex maneja qué "página" de goleadores se muestra (0 => jugadores 1,2,3 | 1 => jugadores 4,5,6)
  const [chunkIndex, setChunkIndex] = useState(0);

  // 🎉 Datos de ejemplo para el torneo
  const torneo = {
    name: "Torneo de Veteranos",

    // 🔸 topScorers: 6 jugadores, 3 por chunk
    topScorers: [
      {
        name: "Vinicius Jr",
        goals: 25,
        playerImg: "https://placehold.co/120x120?text=VIN",
        teamImg: "https://placehold.co/50x50?text=RM",
      },
      {
        name: "Dusan",
        goals: 20,
        playerImg: "https://placehold.co/120x120?text=VLA",
        teamImg: "https://placehold.co/50x50?text=JUV",
      },
      {
        name: "Haller",
        goals: 19,
        playerImg: "https://placehold.co/120x120?text=HAL",
        teamImg: "https://placehold.co/50x50?text=BVB",
      },
      {
        name: "Neymar Jr",
        goals: 15,
        playerImg: "https://placehold.co/120x120?text=NEY",
        teamImg: "https://placehold.co/50x50?text=PSG",
      },
      {
        name: "Mason",
        goals: 12,
        playerImg: "https://placehold.co/120x120?text=MOU",
        teamImg: "https://placehold.co/50x50?text=CHE",
      },
      {
        name: "Lewandowski",
        goals: 10,
        playerImg: "https://placehold.co/120x120?text=LEW",
        teamImg: "https://placehold.co/50x50?text=FCB",
      },
    ],

    // 🔸 Próximo Partido
    nextMatch: {
      teamA: "Juventus",
      teamB: "Real Madrid",
    },

    // 🔸 Tarjetas (ejemplo)
    cards: [
      {
        name: "Player 1",
        team: "Real Madrid",
        yellow: 2,
        red: 0,
        img: "https://placehold.co/40x40?text=P1",
      },
      {
        name: "Player 2",
        team: "Real Madrid",
        yellow: 1,
        red: 0,
        img: "https://placehold.co/40x40?text=P2",
      },
      {
        name: "Player 3",
        team: "Juventus",
        yellow: 3,
        red: 1,
        img: "https://placehold.co/40x40?text=P3",
      },
    ],

    // 🔸 Tabla de Posiciones
    stats: [
      { team: "Real Madrid", points: 14 },
      { team: "Juventus", points: 13 },
      { team: "Borussia Dortmund", points: 12 },
    ],
  };

  

  // 🔢 chunkSize = 3 => cada "página" de goleadores muestra 3 jugadores
  const chunkSize = 3;
  // 🏷 totalChunks = cuántas páginas hay. En este ejemplo, 6/3 = 2
  const totalChunks = Math.ceil(torneo.topScorers.length / chunkSize);

  // 🔍 currentPlayers = jugadores de la "página" actual
  const currentPlayers = torneo.topScorers.slice(
    chunkIndex * chunkSize,
    (chunkIndex + 1) * chunkSize
  );

  // ⏭ handleNext => pasar a la siguiente página de goleadores
  const handleNext = () => {
    if (chunkIndex < totalChunks - 1) {
      setChunkIndex(chunkIndex + 1);
    }
  };

  // ⏮ handlePrev => volver a la página anterior de goleadores
  const handlePrev = () => {
    if (chunkIndex > 0) {
      setChunkIndex(chunkIndex - 1);
    }
  };
 

  return (
    <>
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Contenedor principal del dashboard */}
      <div className="details-dashboard">
        {/* Título principal en barra negra */}
        <h2 className="main-title">{torneo.name}</h2>

        {/* 🟨 Fila 1: 2 tarjetas (50% cada una) */}
        <div className="row">
          {/* Card de Máximos Goleadores (oscura) */}
          <div className="card scorers-dark-card">
            <div className="scorer-header">
              <img className="trofeo" src={trofeo} alt="Trophy" />
              <h3 className="section-title">Máximos Goleadores</h3>
            </div>

            {/* 🏆 chunk de goleadores */}
            <div className="scorer-chunk-wrapper" key={chunkIndex}>
              {currentPlayers.map((scorer, i) => {
                // rank = número global (1..6)
                const rank = chunkIndex * chunkSize + (i + 1);

                return (
                  <div key={rank} className="scorer-card-chunk">
                    {/* Barra lateral con el rank en dorado */}
                    <div className="left-rank-bar">
                      <span className="rank-number">{rank}</span>
                    </div>
                    {/* Escudo del equipo arriba a la derecha */}
                    <img
                      src={scorer.teamImg}
                      alt="Team"
                      className="team-badge"
                    />
                    {/* Foto del jugador con borde blanco */}
                    <div className="photo-wrapper">
                      <img
                        src={scorer.playerImg}
                        alt={scorer.name}
                        className="player-photo"
                      />
                    </div>
                    {/* Nombre del jugador */}
                    <div className="player-name">{scorer.name}</div>
                    {/* Círculo oscuro con goles */}
                    <div className="goals-circle">
                      <span className="goals-count">{scorer.goals}</span>
                      <span className="goals-text">Goles</span>
                    </div>
                  </div>
                );
              })}

              {chunkIndex > 0 && (
                <div className="scorer-arrow left-arrow">
                  <button
                    type="button"
                    className="btn btn-light rounded-circle text-dark arrow-btn"
                    onClick={handlePrev}
                  >
                    <Icon path={mdiChevronRight} size={1.2} color="black" />
                    <i className="bi bi-chevron-double-left"></i>
                  </button>
                </div>
              )}
              {chunkIndex < totalChunks - 1 && (
                <div className="scorer-arrow right-arrow">
                  <button
                    type="button"
                    className="btn btn-light rounded-circle text-dark arrow-btn"
                    onClick={handleNext}
                  >
                    <Icon path={mdiChevronRight} size={1.2} color="black" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="card card-partido">
            {/* Encabezado con balón y título */}
            <div className="partido-header">
              <img className="balon-fuego" src={balon} alt="balon" />
              <h3 className="section-title-vs">Próximo Partido</h3>
            </div>

            {/* Contenido del partido */}
            <div className="container-vs">
              {/* Equipo A */}
              <div className="equipo">
                <img
                  src="https://placehold.co/50x50?text=J"
                  alt={torneo.nextMatch.teamA}
                  className="equipo-img"
                />
                <span className="equipo-nombre">{torneo.nextMatch.teamA}</span>
              </div>

              {/* Centro: VS + rayo */}
              <div className="vs-center">
                <div className="vs-circle">VS</div>
                <img src={rayo} alt="rayo" className="rayo" />
              </div>

              {/* Equipo B */}
              <div className="equipo">
                <img
                  src="https://placehold.co/50x50?text=RM"
                  alt={torneo.nextMatch.teamB}
                  className="equipo-img"
                />
                <span className="equipo-nombre">{torneo.nextMatch.teamB}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Row 2 - Tarjetas + Posiciones */}
        <div className="row">
          <div className="card">
            <div className="tarjetas-header">
              <img src={cards} alt="cards" />
              <h3 className="section-title">Tarjetas</h3>
            </div>
            {torneo.cards.map((player, index) => (
  <div key={index} className="card-player">
    {/* 🔢 Número, imagen, nombre */}
    <div className="left-info">
      <span className="rank-number-cards">{index + 1}</span>
      <img src={player.img} alt={player.name} className="card-avatar" />
      <div className="player-name-cards">
        <span>{player.name}</span>
      </div>
    </div>

    {/* 🟨 Tarjetas alineadas en columna */}
    <div className="card-info">
      <div className="card-count-group">
        <div className="card-count yellow">
          <span className="yellow-card-info">
            <img src={yellow} alt="tarjeta amarilla" />
            <strong>{player.yellow}</strong>
          </span>
        </div>
        <div className="card-count red">
          <span className="yellow-card-info">
            <img src={red} alt="tarjeta roja" />
            <strong>{player.red}</strong>
          </span>
        </div>
      </div>
    </div>

    {/* 🏁 Equipo con texto a la izquierda */}
    <div className="card-team">
      <div className="team-text">
        <span className="equipo-label">Equipo:</span>
        <span className="equipo-nombre">{player.team}</span>
      </div>
      <img
        src="https://placehold.co/30x30?text=EQ"
        alt="team"
        className="equipo-img"
      />
    </div>
  </div>
))}    </div>
          <div className="card standings-card">
  {/* Header con ícono y título */}
  <div className="standings-header">
    <img className="trofeo" src={trofeo} alt="Trophy" />
    <h3 className="section-title">Tabla de Posiciones</h3>
  </div>

  {/* Tabla de posiciones */}
  <div className="standings-wrapper">
    {torneo.stats.slice(0, 3).map((item, index) => (
      <div key={index} className="standings-item">
        {/* Barra lateral con el ranking */}
        <div className="rank-bar">
          <span className="rank-number">{index + 1}</span>
        </div>

        {/* Logo del equipo */}
        <img
          src={`https://placehold.co/50x50?text=${item.team.charAt(0)}`}
          alt="Escudo"
          className="team-logo"
        />

        {/* Nombre del equipo */}
        <div className="team-name">{item.team}</div>

        {/* Círculo con puntos */}
        <div className="points-circle">
          <span className="points-number">{item.points}</span>
          <span className="points-text">Puntos</span>
        </div>
      </div>
    ))}

    {/* Botón de navegación (decorativo por ahora) */}
    <div className="standings-arrow">
        <button
          className="btn btn-light rounded-circle text-dark arrow-btn"
          onClick={() => navigate("/dashboard-statistics")}
        >
          <i className="bi bi-chevron-right"></i>
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
