import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import API_BASE_URL from "../../api/config";
import "./ListaArbitros.css";
import Navbar from "../../components/navbar/Navbar";
import topImage from "../../assets/Top.png";
import iconTrophy from "../../assets/trophy-icon.png";
import iconEliminar from "../../assets/delete.png";
import iconEditar from "../../assets/edit.png";
import iconVer from "../../assets/details.png";
import Buscador from "../../components/buscador/Buscador";
import Swal from "sweetalert2";
import FormularioArbitro from "../../components/formularioArbitro/FormularioArbitro";

const ListaArbitros = () => {
  const [busqueda, setBusqueda] = useState("");
  const [arbitros, setArbitros] = useState([]);
  const [arbitroEditando, setArbitroEditando] = useState(null);

  const fetchArbitros = async () => {
    try {
      const response = await axiosInstance.get("/arbitros");
      setArbitros(response.data);
    } catch (error) {
      console.error("Error al obtener árbitros:", error);
    }
  };

  useEffect(() => {
    fetchArbitros();
  }, []);

  const handleEliminar = (nombre, apellido) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar al árbitro "${nombre} ${apellido}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const arbitro = arbitros.find((a) => a.nombre === nombre && a.apellido === apellido);
          await axiosInstance.delete(`/arbitros/${arbitro.id}`);
          setArbitros(arbitros.filter((a) => a.id !== arbitro.id));

          Swal.fire({
            title: "Eliminado",
            text: `El árbitro "${nombre} ${apellido}" fue eliminado correctamente.`,
            icon: "success",
            confirmButtonColor: "#dc3545",
          });
        } catch (error) {
          console.error("Error al eliminar árbitro:", error);
        }
      }
    });
  };

  const handleGuardar = async (actualizado) => {
    try {
      await axiosInstance.put(`/arbitros/${actualizado.id}`, actualizado);

      const nuevos = arbitros.map((a) =>
        a.id === actualizado.id ? actualizado : a
      );
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
            onBuscar={() => console.log("Buscar:", busqueda)}
          />
        </div>

        <div className="tabla-arbitros">
          <div className="tabla-cabecera">
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Correo</span>
            <span>Acciones</span>
          </div>

          {filtrados.map((arbitro, index) => (
            <div className="tabla-fila" key={index}>
              <span>{arbitro.nombre}</span>
              <span>{arbitro.apellido}</span>
              <span>{arbitro.correo}</span>
              <span className="acciones">
                <img
                  src={iconEliminar}
                  alt="Eliminar"
                  onClick={() => handleEliminar(arbitro.nombre, arbitro.apellido)}
                />
                <img
                  src={iconEditar}
                  alt="Editar"
                  onClick={() => setArbitroEditando(arbitro)}
                />
                <img src={iconVer} alt="Ver" />
              </span>
            </div>
          ))}
        </div>

        {arbitroEditando && (
          <FormularioArbitro
            arbitro={arbitroEditando}
            onClose={() => setArbitroEditando(null)}
            onSave={handleGuardar}
          />
        )}
      </div>
    </>
  );
};

export default ListaArbitros;