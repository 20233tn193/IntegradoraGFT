import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./UpcomingMatches.css";
import locationIcon from "../../assets/location.png";
import balon from "../../assets/balon-fuego.png";


// 👇 Aquí declaras el array dentro del archivo (sin export)
const partidos = [
  {
    local: { nombre: "Juventus", logo: "https://placehold.co/40x40?text=JUV", goles: 2 },
    visitante: { nombre: "Real Madrid", logo: "https://placehold.co/40x40?text=RM", goles: 0 },
    campo: "Los Tamales",
    subcampo: "Verde",
    hora: "4:00 pm",
    arbitro: "Juan Chavez",
  },
  {
    local: { nombre: "Barcelona", logo: "https://placehold.co/40x40?text=FCB", goles: 1 },
    visitante: { nombre: "Real Madrid", logo: "https://placehold.co/40x40?text=RM", goles: 1 },
    campo: "Campo JB",
    subcampo: "1",
    hora: "5:00 pm",
    arbitro: "Zujeily Madrigal",
  },
  {
    local: { nombre: "Chelsea", logo: "https://placehold.co/40x40?text=CHE", goles: 3 },
    visitante: { nombre: "PSG", logo: "https://placehold.co/40x40?text=PSG", goles: 2 },
    campo: "Los Tamales",
    subcampo: "Rojo",
    hora: "6:00 pm",
    arbitro: "Hanna Romy",
  },
];

const UpcomingMatches = () => {
  return (
    <div className="upcoming-matches">
      <Navbar />

      <div className="partidos-content">
        {/* Encabezado tipo etiqueta negra */}
        <div className="encabezado-seccion">
             <img className="balon-fuego" src={balon} alt="balon" />
          <span className="encabezado-texto">Partidos</span>
        </div>

        <h4 className="jornada-subtitulo">Jornada 1 de 12 - Domingo 23/03/2025</h4>

        {partidos.map((match, i) => (
          <div className="card-match" key={i}>
            {/* Sección izquierda: Equipos + marcador */}
            <div className="match-teams">
              <div className="team-row">
                <img src={match.local.logo} alt="Local" className="team-logo" />
                <span className="team-name">{match.local.nombre}</span>
                <span className="score">{match.local.goles}</span>
              </div>
              <div className="team-row">
                <img src={match.visitante.logo} alt="Visitante" className="team-logo" />
                <span className="team-name">{match.visitante.nombre}</span>
                <span className="score">{match.visitante.goles}</span>
              </div>
            </div>

            {/* Separador visual */}
            <div className="divider" />

            {/* Info de campo y hora */}
            <div className="match-info">
              <p><strong>Campo:</strong> <em>{match.campo}</em></p>
              <div className="field-subinfo">
                <img src={locationIcon} alt="map" className="map-icon" />
                <em>{match.subcampo}</em>
              </div>
              <p>{match.hora}</p>
            </div>

            {/* Separador visual */}
            <div className="divider" />

            {/* Árbitro */}
            <div className="referee-info">
              <p><strong>Árbitro:</strong></p>
              <p><em>{match.arbitro}</em></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;