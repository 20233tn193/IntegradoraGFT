import React, { useState, useEffect } from "react";
import "./FormularioEditarTorneo.css";
import Swal from "sweetalert2"; // ⬅️ Asegúrate de tener esto arriba


const placeholderImages = [
  "https://placehold.co/100x100/000/FFF?text=Team+1",
  "https://placehold.co/100x100/222/FFF?text=Team+2",
  "https://placehold.co/100x100/444/FFF?text=Team+3",
  "https://placehold.co/100x100/666/FFF?text=Team+4",
  "https://placehold.co/100x100/888/FFF?text=Team+5",
  "https://placehold.co/100x100/AAA/FFF?text=Team+6",
];

const FormularioEditarTorneo = ({ torneo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    teams: "",
    status: "",
    date: "",
    cost: "",
    image: placeholderImages[0],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // 🔁 Cuando cambia el torneo a editar, precargamos la info
  useEffect(() => {
    if (torneo) {
      setFormData({
        name: torneo.nombre || "",
        teams: torneo.numEquipos || "",
        status: torneo.estado || "ABIERTO",
        date: torneo.fechaInicio || "",
        cost: torneo.costo || "",
        image: torneo.image || placeholderImages[0],
      });
      setSelectedImage(torneo.image || placeholderImages[0]);
    }
  }, [torneo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (img) => {
    setSelectedImage(img);
  };

  const handleConfirmImage = () => {
    setFormData({ ...formData, image: selectedImage });
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    onSave(formData);
  
    Swal.fire({
      title: "Torneo actualizado",
      text: "El torneo ha sido guardado correctamente.",
      icon: "success",
      confirmButtonColor: "#dc3545"
    }).then(() => {
      onClose(); // ✅ Cierra el modal después del OK
    });
  };

  return (
    <form className="tournament-form" onSubmit={handleSubmit}>
      <div className="left-section">
        <div className="image-placeholder">
          <img src={formData.image} alt="Torneo" className="selected-image" />
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Número de equipos: *</label>
        <input
          type="number"
          name="teams"
          value={formData.teams}
          onChange={handleChange}
          required
        />

        <label>Precio: *</label>
        <input
          type="text"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          required
        />

        <label>Estado: *</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="ABIERTO">ABIERTO</option>
          <option value="ACTIVO">ACTIVO</option>
          <option value="FINALIZADO">FINALIZADO</option>
        </select>

        <label>Fecha de inicio: *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

<div className="torneo-button-group">
<button type="submit" className="guardar-btn">GUARDAR</button> 
 <button type="button" className="cancelar-btn" onClick={onClose}>CANCELAR</button>
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
                  className={`grid-image ${
                    selectedImage === img ? "selected" : ""
                  }`}
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
