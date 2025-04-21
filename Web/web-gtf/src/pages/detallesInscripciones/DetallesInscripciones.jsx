import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Buscador from "../../components/buscador/Buscador";
import iconEliminar from "../../assets/delete.png";
import iconBack from "../../assets/back.png";
import topImage from "../../assets/Top.png";
import "./DetallesInscripciones.css";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";
import Loading from "../../components/loading/Loading";

const DetallesInscripciones = () => {
  const navigate = useNavigate();
  const { torneoId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [datos, setDatos] = useState([]);
  const [torneoInfo, setTorneoInfo] = useState({ nombre: "", maxEquipos: 0, fechaInicio: "", estado: "" });
  const [loading, setLoading] = useState(true);

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
          fechaInicio: torneoRes.data.fechaInicio?.split("T")[0] || "",
          estado: torneoRes.data.estado
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
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

  const handleCerrarTorneo = async () => {
    if (torneoInfo.estado.toLowerCase() === "finalizado") {
      Swal.fire({
        icon: "info",
        title: "Torneo ya finalizado",
        text: "Este torneo ya fue finalizado y no se pueden generar nuevas jornadas.",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    const pagosPendientes = datos.some(d => d.pagoEstatus.toLowerCase() !== "pagado");
    if (pagosPendientes) {
      Swal.fire({
        icon: "warning",
        title: "Pagos pendientes",
        text: "No se puede iniciar el torneo. Hay pagos sin aprobar.",
        confirmButtonColor: "#dc3545"
      });
      return;
    }

    try {
      await axiosInstance.put(`/torneos/iniciar/${torneoId}`);
      await axiosInstance.post(`/torneos/${torneoId}/generar-jornada`);
      navigate("/upcoming-matches");
    } catch (error) {
      console.error("Error al cerrar torneo:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al iniciar el torneo o generar la jornada.",
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

  const todosPagados = datos.every(d => d.pagoEstatus?.toLowerCase() === "pagado");

  const duenosUnicos = new Set(datos.map(d => d.duenoNombre));
  const totalDuenos = duenosUnicos.size;

  return (
    <>
      <Navbar />
      <div className="dashboard-stadistic-background" style={{ backgroundImage: `url(${topImage})` }}></div>

      {loading ? (
        <Loading />
      ) : (
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
              onBuscar={() => {}}
            />
          </div>

          <table className="torneos-table-estilo">
            <thead>
              <tr>
                <th>Dueño</th>
                <th>Equipo</th>
                <th>Pago</th>
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
              <span className="label">Equipos inscritos:</span>{" "}
              <span className="valor">
                {datos.length}/{torneoInfo.maxEquipos}
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
            <button
              className="btn-cerrar-torneo"
              onClick={handleCerrarTorneo}
              disabled={!todosPagados}
              style={{ backgroundColor: todosPagados ? "#111a3a" : "#ccc", cursor: todosPagados ? "pointer" : "not-allowed" }}
            >
              CERRAR TORNEO Y GENERAR ROLES
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetallesInscripciones;