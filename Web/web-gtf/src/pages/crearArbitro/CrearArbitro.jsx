import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./CrearArbitro.css";
import tropyImage from "../../assets/trophy-icon.png";
import topImage from "../../assets/Top.png";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";

const CrearArbitro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
    contrasena: "",
  });

  const [imagenPreview, setImagenPreview] = useState("https://placehold.co/250x340?text=Foto");
  const [fotoBase64, setFotoBase64] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFotoBase64(reader.result); // base64 completa
        setImagenPreview(reader.result); // mostrar en preview
      };

      reader.readAsDataURL(file); // 📌 convierte a base64
    }
  };

  const handleImagenClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/register/arbitro", {
        correo: formData.correo,
        password: formData.contrasena,
        roles: ["ARBITRO"],
        nombre: formData.nombre,
        apellido: formData.apellido,
        fotoUrl: fotoBase64, // ✅ se envía como base64
      });

      Swal.fire({
        title: "¡Árbitro registrado!",
        text: `El árbitro ${formData.nombre} ha sido creado exitosamente.`,
        icon: "success",
        confirmButtonColor: "#000",
        confirmButtonText: "Aceptar",
      }).then(() => navigate("/crear-arbitro"));

      setFormData({
        nombre: "",
        apellido: "",
        correo: "",
        celular: "",
        contrasena: "",
      });
      setImagenPreview("https://placehold.co/250x340?text=Foto");
      setFotoBase64(null);
    } catch (error) {
      console.error("❌ Error al registrar árbitro:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar el árbitro.",
        icon: "error",
        confirmButtonColor: "#000",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="crear-arbitro-container">
        <div className="crear-arbitro-background" style={{ backgroundImage: `url(${topImage})` }}></div>

        <div className="crear-arbitro-title">
          <img src={tropyImage} alt="icono" />
          <span>Registrar Árbitro</span>
        </div>

        <form className="crear-arbitro-form" onSubmit={handleSubmit}>
          <div className="form-left">
            <img src={imagenPreview} alt="placeholder" className="placeholder-image" />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImagenChange}
            />
            <button type="button" className="btn-subir" onClick={handleImagenClick}>
              <i>Cargar imagen</i>
            </button>
          </div>

          <div className="form-right">
            <div className="form-columns">
              <div className="form-column">
                <label>Nombre: <span className="required">*</span></label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

                <label>Apellido <span className="required">*</span></label>
                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />

                <label>Número celular: <span className="required">*</span></label>
                <input type="text" name="celular" value={formData.celular} onChange={handleChange} required />
              </div>

              <div className="form-column">
                <label>Correo electrónico <span className="required">*</span></label>
                <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />

                <label>Contraseña: <span className="required">*</span></label>
                <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="arbitro-btn crear">CREAR</button>
              <button type="button" className="arbitro-btn cancelar" onClick={() => navigate("/menu")}>
                CANCELAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CrearArbitro;