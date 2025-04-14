import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./DetallesDueno.css";
import Navbar from "../../components/navbar/Navbar";
import iconTrophy from "../../assets/trophy-icon.png";
import iconEliminar from "../../assets/delete.png";
import Buscador from "../../components/buscador/Buscador";
import Paginador from "../../components/paginador/Paginador";
import Swal from "sweetalert2";
import topImage from "../../assets/Top.png";
import Loading from "../../components/loading/Loading"; // ✅ Importar Loading

const DetallesDueno = () => {
  const [busqueda, setBusqueda] = useState("");
  const [duenos, setDuenos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true); // ✅ Estado de carga
  const duenosPorPagina = 10;

  const fetchDuenos = async () => {
    try {
      const response = await axiosInstance.get("/duenos");
      setDuenos(response.data);
    } catch (error) {
      console.error("Error al obtener dueños:", error);
    } finally {
      setLoading(false); // ✅ Se oculta el loading
    }
  };

  useEffect(() => {
    fetchDuenos();
  }, []);

  const handleToggleEliminado = async (dueno) => {
    try {
      await axiosInstance.put(`/duenos/${dueno.id}/estado`, {
        eliminado: !dueno.eliminado,
      });
      fetchDuenos();
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `El dueño ahora está ${!dueno.eliminado ? "habilitado" : "eliminado"}.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al cambiar estado eliminado:", error);
      Swal.fire("Error", "No se pudo cambiar el estado del dueño.", "error");
    }
  };

  const filtrados = duenos.filter((d) =>
    `${d.nombre} ${d.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados.length / duenosPorPagina);
  const indexUltimo = paginaActual * duenosPorPagina;
  const indexPrimero = indexUltimo - duenosPorPagina;
  const duenosPaginados = filtrados.slice(indexPrimero, indexUltimo);

  return (
    <>
      <Navbar />
      <div className="dueno-background" style={{ backgroundImage: `url(${topImage})` }}></div>

      {loading ? (
        <Loading /> // ✅ Pantalla de carga
      ) : (
        <div className="dueno-container">
          <div className="dueno-header">
            <div className="dueno-title">
              <img src={iconTrophy} alt="icono" />
              <span>Detalles Dueños</span>
            </div>

            <Buscador
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onBuscar={() => {}}
            />
          </div>

          <div className="dueno-tabla">
            <div className="dueno-cabecera">
              <span>Nombre</span>
              <span>Apellido</span>
              <span>Correo</span>
              <span>Habilitar/Inhabilitar</span>
            </div>

            {duenosPaginados.map((dueno, index) => (
              <div
                className={`dueno-fila ${dueno.eliminado ? "fila-eliminada" : ""}`}
                key={index}
              >
                <span>{dueno.nombre}</span>
                <span>{dueno.apellido}</span>
                <span>{dueno.correo}</span>
                <span className="acciones">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={!dueno.eliminado}
                      onChange={() => handleToggleEliminado(dueno)}
                    />
                  </div>
                </span>
              </div>
            ))}
          </div>

          <Paginador
            totalPaginas={totalPaginas}
            paginaActual={paginaActual}
            cambiarPagina={setPaginaActual}
          />
        </div>
      )}
    </>
  );
};

export default DetallesDueno;