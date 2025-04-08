import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./TorneosRegistrados.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Buscador from "../../components/buscador/Buscador";
import topImage from "../../assets/Top.png";
import iconVer from "../../assets/details.png";
import iconEditar from "../../assets/edit.png";
import iconEliminar from "../../assets/delete.png";
import Swal from "sweetalert2";
import FormularioEditarTorneo from "../../components/formularioEditarTorneo/FormularioEditarTorneo";

const TorneosRegistrados = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [torneoEditando, setTorneoEditando] = useState(null);
  const [torneos, setTorneos] = useState([]);

  // 🔢 Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const torneosPorPagina = 5;
  const indexUltimo = currentPage * torneosPorPagina;
  const indexPrimero = indexUltimo - torneosPorPagina;

  // Obtener torneos desde la API
  const fetchTorneos = async () => {
    try {
      const response = await axiosInstance.get("/torneos");
      setTorneos(response.data);
    } catch (error) {
      console.error("Error al obtener torneos:", error);
    }
  };

  useEffect(() => {
    fetchTorneos();
  }, []);

  const torneosFiltrados = torneos.filter((t) =>
    t.nombreTorneo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const torneosPaginados = torneosFiltrados.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(torneosFiltrados.length / torneosPorPagina);

  const handleEliminarTorneo = async (torneo) => {
    Swal.fire({
      title: "¿Estás seguro?",
      html: `¿Quieres eliminar el <strong>${torneo.nombreTorneo}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/torneos/${torneo.id}`);
          setTorneos(torneos.filter((t) => t.id !== torneo.id));
          Swal.fire({
            title: "Eliminado",
            text: `El ${torneo.nombreTorneo} ha sido eliminado correctamente.`,
            icon: "success",
            confirmButtonColor: "#dc3545",
          });
        } catch (error) {
          console.error("Error al eliminar torneo:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el torneo.",
            icon: "error",
            confirmButtonColor: "#dc3545",
          });
        }
      }
    });
  };

  const handleEditarTorneo = async (torneoId) => {
    try {
      const response = await axiosInstance.get(`/torneos/${torneoId}`);
      setTorneoEditando(response.data);
    } catch (error) {
      console.error("Error al obtener torneo por ID:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener la información del torneo.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

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
            <img src={iconVer} alt="icono" />
            <span>Detalles Torneos</span>
          </div>

          <Buscador
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBuscar={() => console.log("Buscar:", busqueda)}
          />
        </div>

        <table className="torneos-table-estilo">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Num. Equipos</th>
              <th>Fecha Inicio</th>
              <th>Estado</th>
              <th>Costo</th>
              <th className="acciones-columna">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {torneosPaginados.map((torneo, index) => (
              <tr key={index}>
                <td>{torneo.nombreTorneo}</td>
                <td>{torneo.numeroEquipos}</td>
                <td>{torneo.fechaInicio?.split("T")[0]}</td>
                <td>{torneo.estado}</td>
                <td>${torneo.costo}</td>
                <td className="acciones-columna">
                  <div className="acciones">
                    <img
                      src={iconVer}
                      className="icono"
                      alt="ver"
                      onClick={() => navigate("/detalle-inscripciones")}
                    />
                    <img
                      src={iconEditar}
                      alt="editar"
                      className="icono"
                      onClick={() => handleEditarTorneo(torneo.id)}
                    />
                    <img
                      src={iconEliminar}
                      className="icono"
                      alt="eliminar"
                      onClick={() => handleEliminarTorneo(torneo)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 🔽 PAGINADOR */}
        <div className="pagination">
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {torneoEditando && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: "900px" }}>
              <h3 className="title-detalles">Editar Torneo</h3>
              <FormularioEditarTorneo
                torneo={torneoEditando}
                onClose={() => setTorneoEditando(null)}
                onSave={async (torneoActualizado) => {
                  try {
                    await axiosInstance.put(`/torneos/${torneoActualizado.id}`, torneoActualizado);
                    await fetchTorneos();
                    setTorneoEditando(null);
                    Swal.fire({
                      icon: "success",
                      title: "Torneo actualizado correctamente",
                      confirmButtonColor: "#198754",
                    });
                  } catch (error) {
                    console.error("Error al actualizar torneo:", error);
                    Swal.fire({
                      icon: "error",
                      title: "Error al actualizar torneo",
                      confirmButtonColor: "#dc3545",
                    });
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TorneosRegistrados;