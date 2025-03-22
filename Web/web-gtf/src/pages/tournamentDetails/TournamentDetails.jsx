import React from "react";
import { useNavigate } from "react-router-dom";
import "./TournamentDetails.css";

const TournamentDetails = () => {
  const navigate = useNavigate();

  const torneo = {
    name: "Torneo de Veteranos",
    topScorers: [
      { name: "Jhon Doe", team: "Real Madrid", goals: 25, img: "https://placehold.co/50x50" },
      { name: "Jhon Doe", team: "Juventus", goals: 20, img: "https://placehold.co/50x50" },
      { name: "Jhon Doe", team: "Dortmund", goals: 19, img: "https://placehold.co/50x50" }
    ],
    nextMatch: { teamA: "Juventus", teamB: "Real Madrid" },
    cards: [
      { name: "Nombre Apellido", team: "Real Madrid", yellow: 2, red: 0, img: "https://placehold.co/40x40" },
      { name: "Nombre Apellido", team: "Real Madrid", yellow: 2, red: 0, img: "https://placehold.co/40x40" },
      { name: "Nombre Apellido", team: "Real Madrid", yellow: 2, red: 0, img: "https://placehold.co/40x40" },
    ],
    stats: [
      { team: "Real Madrid", points: 14 },
      { team: "Juventus", points: 13 },
      { team: "Borussia Dortmund", points: 12 },
    ]
  };

  return (
    <div className="tournament-details">
      <h2 className="title">{torneo.name}</h2>

      <div className="detail-row">
        <div className="detail-card">
          <h3>Máximos Goleadores</h3>
          {torneo.topScorers.map((scorer, index) => (
            <div key={index} className="scorer">
              <img src={scorer.img} alt={scorer.name} />
              <span>{index + 1}. {scorer.name} - {scorer.goals} goles</span>
            </div>
          ))}
        </div>

        <div className="detail-card">
          <h3>Próximo Partido</h3>
          <p>{torneo.nextMatch.teamA} vs {torneo.nextMatch.teamB}</p>
        </div>
      </div>

      <div className="detail-row">
        <div className="detail-card">
          <h3>TARJETAS</h3>
          {torneo.cards.map((player, index) => (
            <div key={index} className="card-player">
              <img src={player.img} alt={player.name} />
              <span>{index + 1}. {player.name} - {player.team} 🟨 {player.yellow} 🔴 {player.red}</span>
            </div>
          ))}
        </div>

        {/* ✅ Tarjeta clicable para ir a DashboardStatistic */}
        <div
          className="detail-card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard-statistics", { state: torneo })}
        >
          <h3>Estadísticas</h3>
          {torneo.stats.map((team, index) => (
            <p key={index}>{index + 1}. {team.team} - {team.points} puntos</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;