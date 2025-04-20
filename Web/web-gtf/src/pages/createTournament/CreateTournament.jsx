import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTournament.css";
import topImage from '../../assets/Top.png';
import Navbar from "../../components/navbar/Navbar";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";

const placeholderImages = [
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.16.jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.17+(1).jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.17.jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.18+(1).jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.18.jpeg",
  "https://integradoragtf.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-04-07+at+04.07.19.jpeg",
];

const CreateTournament = () => {
  const navigate = useNavigate();

  const [tournament, setTournament] = useState({
    name: "",
    teams: "",
    cost: "",
    status: "ABIERTO",
    date: "",
    image: placeholderImages[0],
    info: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(tournament.image);

  const handleChange = (e) => {
    setTournament({ ...tournament, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamsNumber = parseInt(tournament.teams);
    if (isNaN(teamsNumber) || teamsNumber < 2) {
      Swal.fire({
        icon: "warning",
        title: "Número de equipos inválido",
        text: "El torneo debe tener al menos 2 equipos.",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    const imagenFinal = selectedImage || tournament.image;

    const nuevoTorneo = {
      nombreTorneo: tournament.name,
      numeroEquipos: teamsNumber,
      logoSeleccionado: imagenFinal,
      estado: "ABIERTO",
      informacion: tournament.info || "Información del torneo",
      costo: parseFloat(tournament.cost),
      fechaInicio: tournament.date,
      fechaFin: tournament.date,
      eliminado: false
    };

    try {
      const response = await axiosInstance.post('/torneos', nuevoTorneo);
      console.log("Torneo creado:", response.data);
      Swal.fire({
        title: "Torneo creado",
        text: "El torneo ha sido registrado exitosamente.",
        icon: "success",
        confirmButtonColor: "#dc3545"
      }).then(() => {
        navigate("/ver-torneos");
      });
    } catch (error) {
      console.error("Error al crear torneo:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el torneo.",
        icon: "error",
        confirmButtonColor: "#dc3545"
      });
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleConfirmImage = () => {
    setTournament({ ...tournament, image: selectedImage });
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="create-torneo-background" style={{ backgroundImage: `url(${topImage})` }}></div>

      <div className="create-tournament-container">
        <h2 className="title">
          <span role="img" aria-label="trophy">🏆</span> Crear Torneo
        </h2>

        <form className="tournament-form" onSubmit={handleSubmit}>
          <div className="left-section">
            <div className="image-placeholder">
              <img src={selectedImage} alt="Torneo" className="selected-image" />
            </div>
            <button type="button" className="change-image-btn" onClick={() => setIsModalOpen(true)}>
              Cambiar imagen
            </button>
          </div>

          <div className="right-section">
            <label>Nombre del Torneo: *</label>
            <input
              type="text"
              name="name"
              value={tournament.name}
              onChange={handleChange}
              required
            />

            <label>Número de equipos: *</label>
            <input
              type="number"
              name="teams"
              value={tournament.teams}
              onChange={handleChange}
              required
              min="2"
            />

            <label>Precio de inscripción: *</label>
            <input
              type="number"
              step="0.01"
              name="cost"
              value={tournament.cost}
              onChange={handleChange}
              required
            />

            <label>Información:</label>
            <input
              name="info"
              value={tournament.info}
              onChange={handleChange}
            />

            <label>Fecha de inicio: *</label>
            <input
              type="date"
              name="date"
              value={tournament.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
            />

            <div className="button-group">
              <button type="submit" className="create-btn">CREAR</button>
            </div>
            <div>
              <button type="button" className="cancel-btn" onClick={() => navigate("/ver-torneos")}>CANCELAR</button>
            </div>
          </div>
        </form>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Seleccionar Icono del torneo</h3>
              <div className="image-grid">
                {placeholderImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Placeholder ${index + 1}`}
                    className={`grid-image ${selectedImage === img ? "selected" : ""}`}
                    onClick={() => handleImageSelect(img)}
                  />
                ))}
              </div>
              <div className="modal-buttons">
                <button className="select-btn" onClick={handleConfirmImage}>SELECCIONAR</button>
                <button className="cancel-btn-modal" onClick={() => setIsModalOpen(false)}>CANCELAR</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateTournament;