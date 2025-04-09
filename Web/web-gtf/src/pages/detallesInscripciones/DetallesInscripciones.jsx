import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Buscador from "../../components/buscador/Buscador";
import iconPalomita from "../../assets/palomita.png";
import iconEquis from "../../assets/equis.png";
import iconEliminar from "../../assets/delete.png";
import iconBack from "../../assets/back.png";
import topImage from "../../assets/Top.png";
import "./DetallesInscripciones.css";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";

const DetallesInscripciones = () => {
  const navigate = useNavigate();
  const { torneoId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [datos, setDatos] = useState([]);
  const [torneoInfo, setTorneoInfo] = useState({ nombre: "", maxEquipos: 0, fechaInicio: "", estado: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/equipos/torneo-con-dueno/" + torneoId);
        const equiposTransformados = response.data.map(e => ({
          duenoNombre: e.duenoNombre,
          equipoNombre: e.equipoNombre,
          pagoEstatus: e.pagoEstatus,
          confirmado: null
        }));
        setDatos(equiposTransformados);

        const torneoRes = await axiosInstance.get("/torneos/" + torneoId);
        setTorneoInfo({
          nombre: torneoRes.data.nombreTorneo,
          maxEquipos: torneoRes.data.numeroEquipos,
          fechaInicio: torneoRes.data.fechaInicio.split("T")[0],
          estado: torneoRes.data.estado
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [torneoId]);

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
        const nuevosDatos = datos.filter((item) => item.equipoNombre !== equipo);
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

  const handleCerrarTorneo = async () => {
    try {
      // 1. Finalizar torneo
      await axiosInstance.put(`/torneos/finalizar/${torneoId}`);

      // 2. Generar jornada
      await axiosInstance.post(`/torneos/${torneoId}/generar-jornada`);

      // 3. Redirigir
      navigate("/upcoming-matches");
    } catch (error) {
      console.error("Error al cerrar torneo:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al cerrar el torneo o generar la jornada.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const equiposFiltrados = datos.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th>Pago</th>
              <th>Confirmar Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {equiposFiltrados.map((item, index) => (
              <tr key={index}>
                <td>{item.duenoNombre}</td>
                <td>{item.equipoNombre}</td>
                <td>{item.pagoEstatus}</td>
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
                    onClick={() => handleEliminar(item.equipoNombre)}
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
              {datos.length}/{torneoInfo.maxEquipos+1}
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