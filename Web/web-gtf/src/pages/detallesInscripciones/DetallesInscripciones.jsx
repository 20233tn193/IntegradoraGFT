import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Buscador from "../../components/buscador/Buscador";
import iconPalomita from "../../assets/palomita.png";
import iconEquis from "../../assets/equis.png";
import iconEliminar from "../../assets/delete.png";
import iconBack from "../../assets/back.png";
import topImage from "../../assets/Top.png";
import "./DetallesInscripciones.css";
import Swal from "sweetalert2";

const torneoInfo = {
  nombre: "Torneo de Veteranos",
  maxEquipos: 10,
  fechaInicio: "08/04/2025",
  estado: "Abierto",
};

const datosMock = [
  { duenio: "Javier", equipo: "Real Madrid", fecha: "05/03/2025", pago: "Pagado" },
  { duenio: "Zujeily", equipo: "Barcelona", fecha: "05/03/2025", pago: "Pendiente" },
  { duenio: "Hanna", equipo: "Juventus", fecha: "05/03/2025", pago: "Pendiente" },
];

const DetallesInscripciones = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [datos, setDatos] = useState(
    datosMock.map((item) => ({ ...item, confirmado: null }))
  );

  const handleEliminar = (equipo) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar al equipo "${equipo}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosDatos = datos.filter((item) => item.equipo !== equipo);
        setDatos(nuevosDatos);

        Swal.fire({
          title: "Eliminado",
          text: `El equipo "${equipo}" fue eliminado correctamente.`,
          icon: "success",
          confirmButtonColor: "#dc3545",
        });
      }
    });
  };

  const handleConfirmar = (index, valor) => {
    const nuevos = [...datos];
    nuevos[index].confirmado = valor;
    setDatos(nuevos);
  };

  const handleCerrarTorneo = () => {
    navigate("/upcoming-matches");
  };

  const equiposFiltrados = datos.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
  <img
    src={iconBack}
    alt="icono"
    style={{ cursor: "pointer" }}
    onClick={() => navigate(-1)}
  />
  <span>{torneoInfo.nombre}</span>
</div>

          <Buscador
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBuscar={() => console.log("Buscar:", searchTerm)}
          />
        </div>

        <table className="torneos-table-estilo">
          <thead>
            <tr>
              <th>Dueño</th>
              <th>Equipo</th>
              <th>Fecha Inscripción</th>
              <th>Pago</th>
              <th>Confirmar Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {equiposFiltrados.map((item, index) => (
              <tr key={index}>
                <td>{item.duenio}</td>
                <td>{item.equipo}</td>
                <td>{item.fecha}</td>
                <td>{item.pago}</td>
                <td>
                  <div className="acciones">
                    <img
                      src={iconPalomita}
                      alt="Confirmar"
                      className={`icono ${item.confirmado === true ? "visible" : ""}`}
                      onClick={() => handleConfirmar(index, true)}
                      style={{ opacity: item.confirmado === false ? 0.3 : 1 }}
                    />
                    <img
                      src={iconEquis}
                      alt="Cancelar"
                      className={`icono ${item.confirmado === false ? "visible" : ""}`}
                      onClick={() => handleConfirmar(index, false)}
                      style={{ opacity: item.confirmado === true ? 0.3 : 1 }}
                    />
                  </div>
                </td>
                <td>
                  <img
                    src={iconEliminar}
                    alt="Eliminar"
                    className="icono"
                    onClick={() => handleEliminar(item.equipo)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="resumen-torneo">
          <p>
            <span className="label">Equipos:</span>{" "}
            <span className="valor">
              {equiposFiltrados.length}/{torneoInfo.maxEquipos}
            </span>
          </p>
          <p>
            <span className="label">Estado:</span>{" "}
            <span className="estado">{torneoInfo.estado}</span>
          </p>
          <p>
            <span className="label">Inicio:</span>{" "}
            <span className="valor">{torneoInfo.fechaInicio}</span>
          </p>
          <button className="btn-cerrar-torneo" onClick={handleCerrarTorneo}>
            CERRAR TORNEO Y GENERAR ROLES
          </button>
        </div>
      </div>
    </>
  );
};

export default DetallesInscripciones;
