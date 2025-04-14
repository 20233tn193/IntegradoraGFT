import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./ListaArbitros.css";
import Navbar from "../../components/navbar/Navbar";
import topImage from "../../assets/Top.png";
import iconTrophy from "../../assets/trophy-icon.png";
import iconEditar from "../../assets/edit.png";
import iconVer from "../../assets/details.png";
import Buscador from "../../components/buscador/Buscador";
import Swal from "sweetalert2";
import FormularioArbitro from "../../components/formularioArbitro/FormularioArbitro";
import Paginador from "../../components/paginador/Paginador";
import Loading from "../../components/loading/Loading";

const ListaArbitros = () => {
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [arbitros, setArbitros] = useState([]);
  const [arbitroEditando, setArbitroEditando] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [partidosModal, setPartidosModal] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const arbitrosPorPagina = 10;

  const fetchArbitros = async () => {
    try {
      const response = await axiosInstance.get("/arbitros");
      setArbitros(response.data);
    } catch (error) {
      console.error("Error al obtener árbitros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArbitros();
  }, []);

  const handleToggleEliminado = async (arbitro) => {
    try {
      await axiosInstance.put(`/arbitros/${arbitro.id}/estado`, {
        eliminado: !arbitro.eliminado,
      });
      fetchArbitros();
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `El árbitro ahora está ${!arbitro.eliminado ? "habilitado" : "eliminado"}.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al cambiar estado eliminado:", error);
      Swal.fire("Error", "No se pudo cambiar el estado del árbitro.", "error");
    }
  };

  const handleVerPartidos = async (id) => {
    try {
      const response = await axiosInstance.get(`/arbitros/${id}/partidos`);
      setPartidosModal(response.data);
      setMostrarModal(true);
    } catch (error) {
      console.error("Error al obtener partidos del árbitro:", error);
      Swal.fire("Error", "No se pudieron cargar los partidos.", "error");
    }
  };

  const handleGuardar = async (actualizado) => {
    try {
      await axiosInstance.put(`/arbitros/${actualizado.id}`, actualizado);
      const nuevos = arbitros.map((a) => (a.id === actualizado.id ? actualizado : a));
      setArbitros(nuevos);
      setArbitroEditando(null);
      Swal.fire({
        title: "Guardado",
        text: "Los cambios se guardaron correctamente.",
        icon: "success",
        confirmButtonColor: "#198754",
      });
    } catch (error) {
      console.error("❌ Error al actualizar árbitro:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar los cambios.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const filtrados = arbitros.filter((a) =>
    `${a.nombre} ${a.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados.length / arbitrosPorPagina);
  const inicio = (paginaActual - 1) * arbitrosPorPagina;
  const paginados = filtrados.slice(inicio, inicio + arbitrosPorPagina);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="lista-arbitros-container">
        <div
          className="lista-arbitros-background"
          style={{ backgroundImage: `url(${topImage})` }}
        ></div>

        <div className="encabezado-arbitros">
          <div className="lista-arbitros-title">
            <img src={iconTrophy} alt="icon" />
            <span>Detalles Árbitros</span>
          </div>

          <Buscador
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBuscar={() => {}}
          />
        </div>

        <div className="tabla-arbitros">
          <div className="tabla-cabecera">
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Correo</span>
            <span className="acciones">Habilitar/Inhabilitar</span>
          </div>

          {paginados.map((arbitro, index) => (
            <div
              className={`tabla-fila ${arbitro.eliminado ? "fila-eliminada" : ""}`}
              key={index}
            >
              <span>{arbitro.nombre}</span>
              <span>{arbitro.apellido}</span>
              <span>{arbitro.correo}</span>
              <span className="acciones">
                <img src={iconEditar} alt="Editar" onClick={() => setArbitroEditando(arbitro)} />
                <img src={iconVer} alt="Ver" onClick={() => handleVerPartidos(arbitro.id)} />
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={!arbitro.eliminado}
                    onChange={() => handleToggleEliminado(arbitro)}
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

        {arbitroEditando && (
          <FormularioArbitro
            arbitro={arbitroEditando}
            onClose={() => setArbitroEditando(null)}
            onSave={handleGuardar}
          />
        )}

        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Partidos asignados</h2>
              <div className="lista-partidos-arbitro">
                {partidosModal.map((partido) => (
                  <div className="partido-card" key={partido.id}>
                    <p><strong>Partido:</strong> {partido.nombreEquipoA} vs {partido.nombreEquipoB}</p>
                    <p><strong>Fecha:</strong> {partido.fecha} {partido.hora}</p>
                    <p><strong>Lugar:</strong> {partido.nombreCampo} / {partido.nombreCancha}</p>
                  </div>
                ))}
              </div>
              <button className="boton-cerrar-modal" onClick={() => setMostrarModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListaArbitros;