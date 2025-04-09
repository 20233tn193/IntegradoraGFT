import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axiosInstance from "../../api/axiosInstance";
import "./UpcomingMatches.css";
import locationIcon from "../../assets/location.png";
import balon from "../../assets/balon-fuego.png";
import topImage from "../../assets/Top.png";

const UpcomingMatches = () => {
  const { torneoId } = useParams();
  const [calendario, setCalendario] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await axiosInstance.get(`/partidos/calendario/${torneoId}`);
        setCalendario(response.data);
      } catch (error) {
        console.error("Error al cargar el calendario:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPartidos();
  }, [torneoId]);

  const formatearFechaHora = (fechaRaw, horaRaw) => {
    try {
      let baseDate = null;

      if (fechaRaw?.$date?.$numberLong) {
        baseDate = new Date(Number(fechaRaw.$date.$numberLong));
      } else if (typeof fechaRaw === "string") {
        baseDate = new Date(fechaRaw);
      }

      if (!baseDate || isNaN(baseDate.getTime())) return "Fecha y hora no disponible";

      if (
        horaRaw &&
        typeof horaRaw === "object" &&
        typeof horaRaw.hour === "number" &&
        typeof horaRaw.minute === "number"
      ) {
        baseDate.setHours(horaRaw.hour);
        baseDate.setMinutes(horaRaw.minute);
      }

      const dia = baseDate.getDate().toString().padStart(2, "0");
      const mes = (baseDate.getMonth() + 1).toString().padStart(2, "0");
      const anio = baseDate.getFullYear();
      const horas = baseDate.getHours().toString().padStart(2, "0");
      const minutos = baseDate.getMinutes().toString().padStart(2, "0");

      return `${dia}/${mes}/${anio} - ${horas}:${minutos} hrs`;
    } catch {
      return "Fecha y hora no disponible";
    }
  };

  const esFuturo = (fechaRaw, horaRaw) => {
    try {
      let baseDate = null;

      if (fechaRaw?.$date?.$numberLong) {
        baseDate = new Date(Number(fechaRaw.$date.$numberLong));
      } else if (typeof fechaRaw === "string") {
        baseDate = new Date(fechaRaw);
      }

      if (!baseDate || isNaN(baseDate.getTime())) return true;

      if (
        horaRaw &&
        typeof horaRaw === "object" &&
        typeof horaRaw.hour === "number" &&
        typeof horaRaw.minute === "number"
      ) {
        baseDate.setHours(horaRaw.hour);
        baseDate.setMinutes(horaRaw.minute);
      }

      return baseDate >= new Date();
    } catch {
      return true;
    }
  };

  const handleOpenMap = (campoNombre) => {
    if (!campoNombre) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campoNombre)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="upcoming-matches">
      <Navbar />
      <div
        className="uncoming-matches-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>

      <div className="partidos-content">
        <div className="encabezado-seccion">
          <img className="balon-fuego" src={balon} alt="balon" />
          <span className="encabezado-texto">Partidos</span>
        </div>

        {cargando ? (
          <p className="mensaje-cargando">Cargando partidos...</p>
        ) : Object.keys(calendario).length === 0 ? (
          <p className="mensaje-vacio">No hay partidos programados aún.</p>
        ) : (
          Object.entries(calendario).map(([jornada, partidos]) => {
            const futuros = partidos.filter((match) => esFuturo(match.fecha, match.hora));
            if (futuros.length === 0) return null;

            return (
              <div key={jornada}>
                <h4 className="jornada-subtitulo">Jornada {jornada}</h4>
                {futuros.map((match, i) => (
                  <div className="card-match" key={i}>
                    <div className="match-teams">
                      <div className="team-row">
                        <div className="team-logo-wrapper">
                          <img
                            src={match.logoEquipoA || "https://placehold.co/40x40"}
                            alt="Escudo"
                            className="team-logo"
                          />
                        </div>
                        <div className="team-text-wrapper">
                          <div className="team-text">{match.nombreEquipoA || "Equipo A"}</div>
                        </div>
                      </div>

                      <div className="team-row">
                        <div className="team-logo-wrapper">
                          <img
                            src={match.logoEquipoB || "https://placehold.co/40x40"}
                            alt="Escudo"
                            className="team-logo"
                          />
                        </div>
                        <div className="team-text-wrapper">
                          <div className="team-text">{match.nombreEquipoB || "Equipo B"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="divider" />

                    <div className="match-info">
                      <p>
                        <strong>Campo:</strong> <em>{match.nombreCampo || "Por definir"}</em>
                      </p>
                      <div
                        className="field-subinfo"
                        onClick={() => handleOpenMap(match.nombreCampo)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={locationIcon} alt="map" className="map-icon" />
                        <em>{match.nombreCancha || "Cancha no definida"}</em>
                      </div>
                      <p>
                        <strong>Fecha y hora:</strong>{" "}
                        {formatearFechaHora(match.fecha, match.hora)}
                      </p>
                    </div>

                    <div className="divider" />

                    <div className="referee-info">
                      <p>
                        <strong>Árbitro:</strong>
                      </p>
                      <p>
                        <em>{match.nombreArbitro || "Por asignar"}</em>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UpcomingMatches;