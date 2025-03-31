import React, { useState } from "react";
import "./CamposRegistrados.css";
import Navbar from "../../components/navbar/Navbar";
import iconUbicacion from "../../assets/location.png";
import iconEliminar from "../../assets/delete.png";
import iconEditar from "../../assets/edit.png";
import iconDetalles from "../../assets/details.png";
import topImage from "../../assets/Top.png";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FormularioEdicion from "../../components/formularioEdicion/FormularioEdicion";
import Swal from "sweetalert2";

const camposMock = [
  {
    nombre: "Los Tamales",
    cancha1: "Verde",
    cancha2: "Rojo",
    cancha3: "",
    ubicacion: { lat: 17.065, lng: -96.725 }, // ejemplo
  },
  {
    nombre: "Campo JB",
    cancha1: "1",
    cancha2: "2",
    cancha3: "",
    ubicacion: { lat: 18.8502834, lng: -99.2033104 }
  },
  {
    nombre: "El Corral",
    cancha1: "1",
    cancha2: "",
    cancha3: "",
    ubicacion: { lat: 18.8451428, lng: -99.2277649},
  },
  {
    nombre: "Matorrales",
    cancha1: "1",
    cancha2: "2",
    cancha3: "3",
    ubicacion: { lat: 17.061, lng: -96.728 },
  },
];

const CamposRegistrados = () => {
  const [showModal, setShowModal] = useState(false);
  const [detalleCampo, setDetalleCampo] = useState({ cancha2: "", cancha3: "" });

  const abrirModalDetalles = (campo) => {
    if (campo.cancha2 || campo.cancha3) {
      setDetalleCampo({ cancha2: campo.cancha2, cancha3: campo.cancha3 });
      setShowModal(true);
    }
  };
  const [mapaModal, setMapaModal] = useState({ show: false, position: null, nombre: "" });
  const abrirMapaModal = (campo) => {
    setMapaModal({ show: true, position: campo.ubicacion, nombre: campo.nombre });
  };
  const ubicacion = new L.Icon({
    iconUrl: iconUbicacion, 
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });
  const [campoEditando, setCampoEditando] = useState(null);
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
        // Aquí podrías hacer lógica real para eliminar si conectas con backend
  
        Swal.fire({
          title: "Eliminado",
          text: `El campo ${campo.nombre} ha sido eliminado correctamente.`,
          icon: "success",
          confirmButtonColor: "#dc3545",
        });
  
        // Si estuvieras usando estado real:
        // setCampos(campos.filter(c => c.nombre !== campo.nombre));
      }
    });
  };
  return (
    <>
      <Navbar />
      <div
        className="campos-registrados-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>

      <div className="campos-container">
        <div className="campos-header">
          <img src={iconUbicacion} alt="icono" />
          <span>Detalles Campos</span>
        </div>

        <div className="campos-table-container">
          <table className="campos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cancha 1</th>
               
                <th className="acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {camposMock.map((campo, index) => (
                <tr key={index}>
                  <td>{campo.nombre}</td>
                  <td>{campo.cancha1}</td>
                 
                  <td>
                    <div className="acciones">
                      <img
                        src={iconDetalles}
                        alt="ver detalles"
                        className="icono"
                        onClick={() => abrirModalDetalles(campo)}
                      />
                      <img
  src={iconUbicacion}
  alt="ubicación"
  className="icono"
  onClick={() => abrirMapaModal(campo)}
/>
<img
  src={iconEditar}
  alt="editar"
  className="icono"
  onClick={() => setCampoEditando(campo)}
/>
<img
  src={iconEliminar}
  alt="eliminar"
  className="icono"
  onClick={() => handleEliminarCampo(campo)}
/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="title-detalles">Detalles de Canchas</h3>
              {detalleCampo.cancha2 && <p><strong>Cancha 2:</strong> <br />{detalleCampo.cancha2}</p>}
              {detalleCampo.cancha3 && <p><strong>Cancha 3:</strong> <br />{detalleCampo.cancha3}</p>}
              <button className="cerrar-modal" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
        {mapaModal.show && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3 className="title-detalles">Ubicación de {mapaModal.nombre}</h3>
      <div style={{ height: "300px", width: "100%", borderRadius: "12px", overflow: "hidden", marginTop: "15px" }}>
        <MapContainer center={mapaModal.position} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          />
          <Marker position={mapaModal.position} icon={ubicacion} />
        </MapContainer>
      </div>
      <button className="cerrar-modal" onClick={() => setMapaModal({ show: false, position: null, nombre: "" })}>
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