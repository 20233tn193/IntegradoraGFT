import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Buscador from "../../components/buscador/Buscador";
import "./PagosTorneos.css";
import iconTrophy from "../../assets/trophy-icon.png";
import iconCheck from "../../assets/palomita.png";
import iconClose from "../../assets/equis.png";
import topImage from "../../assets/Top.png";


const PagosTorneos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [pagos, setPagos] = useState([
    {
      tipo: "Inscripción",
      dueno: "Juan Perez",
      equipo: "Real Madrid",
      torneo: "Infantil",
      fecha: "05/03/2025",
      estatus: "Pagado",
      confirmado: null,
    },
    {
      tipo: "Arbitraje",
      dueno: "Hanna Romybsi",
      equipo: "Barcelona",
      torneo: "Veteranos",
      fecha: "05/03/2025",
      estatus: "Pendiente",
      confirmado: null,
    },
    {
      tipo: "Cancha",
      dueno: "Zujeily Madrigal",
      equipo: "Juventus",
      torneo: "Refuerzos",
      fecha: "05/03/2025",
      estatus: "Pendiente",
      confirmado: null,
    },
  ]);

  const handleConfirmar = (index, valor) => {
    const nuevos = [...pagos];
    nuevos[index].confirmado = valor;
    setPagos(nuevos);
  };

  const filtrados = pagos.filter((p) =>
    p.dueno.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>

      <Navbar />
      <div
  className="pagos-background"
  style={{ backgroundImage: `url(${topImage})` }}
></div>
      <div className="pagos-container">
        <div className="pagos-header">
          <div className="pagos-title">
            <img src={iconTrophy} alt="icon" />
            <span>Pagos de Torneos</span>
          </div>
          
          <Buscador
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBuscar={() => console.log("Buscar:", busqueda)}
          />
        </div>
        

        <div className="pagos-tabla">
          <div className="pagos-cabecera">
            <span>Tipo</span>
            <span>Dueño</span>
            <span>Equipo</span>
            <span>Torneo</span>
            <span>Fecha Pago</span>
            <span>Estatus</span>
            <span>Aprobar Pago</span>
          </div>

          {filtrados.map((pago, index) => (
            <div className="pagos-fila" key={index}>
              <span>{pago.tipo}</span>
              <span>{pago.dueno}</span>
              <span>{pago.equipo}</span>
              <span>{pago.torneo}</span>
              <span>{pago.fecha}</span>
              <span>{pago.estatus}</span>
              <span className="acciones">
                <img
                  src={iconCheck}
                  alt="check"
                  className={`icono ${pago.confirmado === true ? "visible" : ""}`}
                  onClick={() => handleConfirmar(index, true)}
                  style={{ opacity: pago.confirmado === false ? 0.3 : 1 }}
                />
                <img
                  src={iconClose}
                  alt="close"
                  className={`icono ${pago.confirmado === false ? "visible" : ""}`}
                  onClick={() => handleConfirmar(index, false)}
                  style={{ opacity: pago.confirmado === true ? 0.3 : 1 }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PagosTorneos;