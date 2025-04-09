import React, { useState, useEffect } from "react";
import "./FormularioEditarTorneo.css";
import Swal from "sweetalert2";

const placeholderImages = [
 "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.16.jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.17+(1).jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.17.jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.18+(1).jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.18.jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.19.jpeg",
];

const FormularioEditarTorneo = ({ torneo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombreTorneo: "",
    numeroEquipos: "",
    estado: "ABIERTO",
    fechaInicio: "",
    costo: "",
    logoSeleccionado: placeholderImages[0],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(placeholderImages[0]);

  useEffect(() => {
    if (torneo) {
      const estadoNormalizado = torneo.estado?.toUpperCase();
      setFormData({
        nombreTorneo: torneo.nombreTorneo || "",
        numeroEquipos: torneo.numeroEquipos || "",
        estado:
          estadoNormalizado === "ACTIVO" ||
          estadoNormalizado === "ABIERTO" ||
          estadoNormalizado === "FINALIZADO"
            ? estadoNormalizado
            : "ABIERTO",
        fechaInicio: torneo.fechaInicio?.split("T")[0] || "",
        costo: torneo.costo || "",
        logoSeleccionado: torneo.logoSeleccionado || placeholderImages[0],
      });
      setSelectedImage(torneo.logoSeleccionado || placeholderImages[0]);
    }
  }, [torneo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (img) => {
    setSelectedImage(img);
  };

  const handleConfirmImage = () => {
    setFormData((prev) => ({
      ...prev,
      logoSeleccionado: selectedImage,
    }));
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...torneo,
      ...formData,
    });

    Swal.fire({
      title: "Torneo actualizado",
      text: "El torneo ha sido guardado correctamente.",
      icon: "success",
      confirmButtonColor: "#dc3545",
    }).then(() => {
      onClose();
    });
  };

  return (
    <form className="tournament-form" onSubmit={handleSubmit}>
      <div className="left-section">
        <div className="image-placeholder">
          <img src={formData.logoSeleccionado} alt="Torneo" className="selected-image" />
        </div>
        <button
          type="button"
          className="change-image-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Cambiar imagen
        </button>
      </div>

      <div className="right-section">
        <label>Nombre del Torneo: *</label>
        <input
          type="text"
          name="nombreTorneo"
          value={formData.nombreTorneo}
          onChange={handleChange}
          required
        />

        <label>Número de equipos: *</label>
        <input
          type="number"
          name="numeroEquipos"
          value={formData.numeroEquipos}
          onChange={handleChange}
          required
        />

        <label>Precio: *</label>
        <input
          type="text"
          name="costo"
          value={formData.costo}
          onChange={handleChange}
          required
        />

        <label>Estado: *</label>
        <select name="estado" value={formData.estado} onChange={handleChange} required>
          <option value="ABIERTO">ABIERTO</option>
          <option value="ACTIVO">ACTIVO</option>
          <option value="FINALIZADO">FINALIZADO</option>
        </select>

        <label>Fecha de inicio: *</label>
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={handleChange}
          required
        />

        <div className="torneo-button-group">
          <button type="submit" className="guardar-btn">
            GUARDAR
          </button>
          <button type="button" className="cancelar-btn" onClick={onClose}>
            CANCELAR
          </button>
        </div>
      </div>

      {/* Modal selección de imagen */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Seleccionar Icono del torneo</h3>
            <div className="image-grid">
              {placeholderImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`img-${index}`}
                  className={`grid-image ${selectedImage === img ? "selected" : ""}`}
                  onClick={() => handleImageSelect(img)}
                />
              ))}
            </div>
            <div className="modal-buttons">
              <button className="select-btn" onClick={handleConfirmImage}>
                SELECCIONAR
              </button>
              <button
                className="cancel-btn-modal"
                onClick={() => setIsModalOpen(false)}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormularioEditarTorneo;
