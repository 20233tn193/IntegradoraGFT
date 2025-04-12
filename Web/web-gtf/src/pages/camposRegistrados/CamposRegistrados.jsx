import React, { useState, useEffect } from "react";
import "./CamposRegistrados.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import iconUbicacion from "../../assets/location.png";
import iconEliminar from "../../assets/delete.png";
import iconEditar from "../../assets/edit.png";
import topImage from "../../assets/Top.png";
import campo from "../../assets/campo.png";
import FormularioEdicion from "../../components/formularioEdicion/FormularioEdicion";
import Swal from "sweetalert2";
import Buscador from "../../components/buscador/Buscador";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axiosInstance from "../../api/axiosInstance";
import Paginador from "../../components/paginador/Paginador";

const CamposRegistrados = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [campos, setCampos] = useState([]);
  const [mapaModal, setMapaModal] = useState({
    show: false,
    position: null,
    nombre: "",
  });
  const [campoEditando, setCampoEditando] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const camposPorPagina = 10;

  const fetchCampos = async () => {
    try {
      const response = await axiosInstance.get("/campos");
      setCampos(response.data);
    } catch (error) {
      console.error("Error al obtener campos:", error);
    }
  };

  useEffect(() => {
    fetchCampos();
  }, []);

  const abrirMapaModal = (campo) => {
    setMapaModal({
      show: true,
      position: { lat: campo.latitud, lng: campo.longitud },
      nombre: campo.nombreCampo,
    });
  };

  const handleEliminarCampo = async (campo) => {
    Swal.fire({
      title: "¿Estás seguro?",
      html: `¿Quieres eliminar el campo <strong>${campo.nombreCampo}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/campos/${campo.id}`);
          setCampos((prev) => prev.filter((c) => c.id !== campo.id));
          Swal.fire({
            title: "Eliminado",
            text: `El campo ${campo.nombreCampo} ha sido eliminado correctamente.`,
            icon: "success",
            confirmButtonColor: "#dc3545",
          });
        } catch (error) {
          console.error("Error al eliminar campo:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el campo.",
            icon: "error",
            confirmButtonColor: "#dc3545",
          });
        }
      }
    });
  };

  const handleEditarCampo = async (campoId) => {
    if (!campoId) return;

    try {
      const response = await axiosInstance.get(`/campos/${campoId}`);
      const campoData = response.data;

      if (!campoData) throw new Error("No se encontró el campo.");

      const campoFormateado = {
        id: campoData.id,
        nombreCampo: campoData.nombreCampo,
        latitud: campoData.latitud,
        longitud: campoData.longitud,
        eliminado: campoData.eliminado,
        disponible: campoData.disponible,
        canchas: campoData.canchas || [],
      };

      setCampoEditando(campoFormateado);
    } catch (error) {
      console.error("Error al obtener campo por ID:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener la información del campo.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const filtrados = campos.filter((campo) =>
    campo.nombreCampo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados.length / camposPorPagina);
  const inicio = (paginaActual - 1) * camposPorPagina;
  const paginados = filtrados.slice(inicio, inicio + camposPorPagina);

  return (
    <>
      <Navbar />
      <div
        className="campos-registrados-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>
      <div className="campos-container">
        <div className="campos-encabezado">
          <div className="campos-header">
            <img src={iconUbicacion} alt="icono" />
            <span>Detalles Campos</span>
          </div>
          <div className="campos-container-header">
            <button
              className="crear-campo-btn"
              type="button"
              onClick={() => navigate("/create-campos")}
            >
              <img src={campo} className="icono" />
              <span className="texto-botton-crear"> Crear campo</span>{" "}
            </button>
            <Buscador
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onBuscar={() => console.log("Buscar:", busqueda)}
            />
          </div>
        </div>

        <div className="campos-tabla">
          <div className="campos-tabla-cabecera">
            <span>Nombre</span>
            <span className="cancha-uno">Cancha 1</span>
            <span className="cancha-dos">Cancha 2</span>
            <span className="cancha-tres">Cancha 3</span>
            <span className="acciones">Acciones</span>
          </div>
          {paginados.map((campo, index) => (
            <div className="campos-tabla-fila" key={index}>
              <span>{campo.nombreCampo}</span>
              <span>{campo.canchas?.[0]?.nombreCancha || ""}</span>
              <span>{campo.canchas?.[1]?.nombreCancha || ""}</span>
              <span>{campo.canchas?.[2]?.nombreCancha || ""}</span>
              <span className="campos-acciones">
                <img
                  src={iconUbicacion}
                  alt="ubicación"
                  onClick={() => abrirMapaModal(campo)}
                />
                <img
                  src={iconEditar}
                  alt="editar"
                  onClick={() => handleEditarCampo(campo.id)}
                />
                <img
                  src={iconEliminar}
                  alt="eliminar"
                  onClick={() => handleEliminarCampo(campo)}
                />
              </span>
            </div>
          ))}
        </div>

        <Paginador
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          cambiarPagina={setPaginaActual}
        />

        {mapaModal.show && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="title-detalles">
                Ubicación de {mapaModal.nombre}
              </h3>
              <div
                style={{
                  height: "300px",
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginTop: "15px",
                }}
              >
                <GoogleMap
                  center={mapaModal.position}
                  zoom={15}
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                >
                  <Marker position={mapaModal.position} />
                </GoogleMap>
              </div>
              <button
                className="cerrar-modal"
                onClick={() =>
                  setMapaModal({ show: false, position: null, nombre: "" })
                }
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {campoEditando && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: "900px" }}>
              <h3 className="title-detalles">Editar Campo</h3>
              <FormularioEdicion
                campo={campoEditando}
                onClose={() => {
                  setCampoEditando(null);
                  fetchCampos();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CamposRegistrados;
