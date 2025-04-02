import React, { useState } from "react";
import "./CamposRegistrados.css";
import Navbar from "../../components/navbar/Navbar";
import iconUbicacion from "../../assets/location.png";
import iconEliminar from "../../assets/delete.png";
import iconEditar from "../../assets/edit.png";
import iconDetalles from "../../assets/details.png";
import topImage from "../../assets/Top.png";
import FormularioEdicion from "../../components/formularioEdicion/FormularioEdicion";
import Swal from "sweetalert2";
import Buscador from "../../components/buscador/Buscador";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const CamposRegistrados = () => {
  const [busqueda, setBusqueda] = useState("");
  const [campos, setCampos] = useState([
    {
      nombre: "Los Tamales",
      cancha1: "Verde",
      cancha2: "Rojo",
      cancha3: "",
      ubicacion: { lat: 17.065, lng: -96.725 },
    },
    {
      nombre: "Campo JB",
      cancha1: "1",
      cancha2: "2",
      cancha3: "",
      ubicacion: { lat: 18.8502834, lng: -99.2033104 },
    },
    {
      nombre: "El Corral",
      cancha1: "1",
      cancha2: "",
      cancha3: "",
      ubicacion: { lat: 18.8451428, lng: -99.2277649 },
    },
    {
      nombre: "Matorrales",
      cancha1: "1",
      cancha2: "2",
      cancha3: "3",
      ubicacion: { lat: 17.061, lng: -96.728 },
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [detalleCampo, setDetalleCampo] = useState({ cancha2: "", cancha3: "" });
  const [mapaModal, setMapaModal] = useState({ show: false, position: null, nombre: "" });
  const [campoEditando, setCampoEditando] = useState(null);

  const abrirModalDetalles = (campo) => {
    if (campo.cancha2 || campo.cancha3) {
      setDetalleCampo({ cancha2: campo.cancha2, cancha3: campo.cancha3 });
      setShowModal(true);
    }
  };

  const abrirMapaModal = (campo) => {
    setMapaModal({ show: true, position: campo.ubicacion, nombre: campo.nombre });
  };

  const handleEliminarCampo = (campo) => {
    Swal.fire({
      title: "¿Estás seguro?",
      html: `¿Quieres eliminar el campo <strong>${campo.nombre}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosCampos = campos.filter((c) => c.nombre !== campo.nombre);
        setCampos(nuevosCampos);

        Swal.fire({
          title: "Eliminado",
          text: `El campo ${campo.nombre} ha sido eliminado correctamente.`,
          icon: "success",
          confirmButtonColor: "#dc3545",
        });
      }
    });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "TU_CLAVE_AQUI", // Cambia por tu API KEY
  });

  const filtrados = campos.filter((campo) =>
    campo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

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

          <Buscador
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBuscar={() => console.log("Buscar:", busqueda)}
          />
        </div>

        <div className="campos-tabla">
          <div className="campos-tabla-cabecera">
            <span>Nombre</span>
            <span>Cancha 1</span>
            <span>Acciones</span>
          </div>

          {filtrados.map((campo, index) => (
            <div className="campos-tabla-fila" key={index}>
              <span>{campo.nombre}</span>
              <span>{campo.cancha1}</span>
              <span className="campos-acciones">
                <img src={iconDetalles} alt="ver detalles" onClick={() => abrirModalDetalles(campo)} />
                <img src={iconUbicacion} alt="ubicación" onClick={() => abrirMapaModal(campo)} />
                <img src={iconEditar} alt="editar" onClick={() => setCampoEditando(campo)} />
                <img src={iconEliminar} alt="eliminar" onClick={() => handleEliminarCampo(campo)} />
              </span>
            </div>
          ))}
        </div>

        {/* Modal Detalles */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="title-detalles">Detalles de Canchas</h3>
              {detalleCampo.cancha2 && (
                <p><strong>Cancha 2:</strong> <br />{detalleCampo.cancha2}</p>
              )}
              {detalleCampo.cancha3 && (
                <p><strong>Cancha 3:</strong> <br />{detalleCampo.cancha3}</p>
              )}
              <button className="cerrar-modal" onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        )}

        {/* Modal Mapa */}
        {mapaModal.show && isLoaded && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="title-detalles">Ubicación de {mapaModal.nombre}</h3>
              <div style={{ height: "300px", width: "100%", borderRadius: "12px", overflow: "hidden", marginTop: "15px" }}>
                <GoogleMap center={mapaModal.position} zoom={15} mapContainerStyle={{ height: "100%", width: "100%" }}>
                  <Marker position={mapaModal.position} />
                </GoogleMap>
              </div>
              <button className="cerrar-modal" onClick={() => setMapaModal({ show: false, position: null, nombre: "" })}>Cerrar</button>
            </div>
          </div>
        )}

        {/* Modal Edición */}
        {campoEditando && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: "900px" }}>
              <h3 className="title-detalles">Editar Campo</h3>
              <FormularioEdicion
                campo={campoEditando}
                onClose={() => setCampoEditando(null)}
                onSave={(nuevoCampo) => {
                  console.log("Campo actualizado:", nuevoCampo);
                  Swal.fire({
                    title: "Cambios guardados",
                    text: "El campo se actualizó correctamente.",
                    icon: "success",
                    confirmButtonColor: "#dc3545",
                  });
                  setCampoEditando(null);
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