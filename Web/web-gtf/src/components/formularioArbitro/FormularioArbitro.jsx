import React, { useState, useEffect, useRef } from "react";
import "./FormularioArbitro.css";

const FormularioArbitro = ({ arbitro, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    idUsuario: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    fotoUrl: ""
  });

  const [imagenPreview, setImagenPreview] = useState("https://placehold.co/250x340?text=Foto");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (arbitro) {
      setFormData({
        id: arbitro.id || "",
        idUsuario: arbitro.idUsuario || "",
        nombre: arbitro.nombre || "",
        apellido: arbitro.apellido || "",
        correo: arbitro.correo || "",
        contrasena: arbitro.contrasena || "",
        fotoUrl: arbitro.fotoUrl || ""
      });

      if (
        arbitro.fotoUrl &&
        (arbitro.fotoUrl.startsWith("data:image") || arbitro.fotoUrl.startsWith("http"))
      ) {
        setImagenPreview(arbitro.fotoUrl);
      }
    }
  }, [arbitro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImagenPreview(base64);
        setFormData((prev) => ({ ...prev, fotoUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagenClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Enviando arbitro:", formData); // 👀 Verifica que contenga fotoUrl en base64
    onSave(formData);
  };

  return (
    <div className="modal-arbitro-overlay">
      <div className="modal-arbitro-content">
        <h3 className="modal-arbitro-title">Editar Árbitro</h3>
        <form className="formulario-arbitro-modal" onSubmit={handleSubmit}>
          <div className="modal-form-left">
            <img src={imagenPreview} alt="Foto" className="modal-placeholder-img" />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImagenChange}
            />
            <button type="button" onClick={handleImagenClick} className="btn-subir-img">
              Cambiar Imagen
            </button>
          </div>

          <div className="modal-form-right">
            <div className="modal-form-columns">
              <div className="modal-form-col">
                <label>Nombre:</label>
                <input name="nombre" value={formData.nombre} onChange={handleChange} required />

                <label>Apellido:</label>
                <input name="apellido" value={formData.apellido} onChange={handleChange} required />
              </div>

              <div className="modal-form-col">
                <label>Correo:</label>
                <input name="correo" value={formData.correo} onChange={handleChange} required />

                <label>Contraseña:</label>
                <input
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-form-buttons">
              <button type="submit" className="btn-guardar-modal">
                GUARDAR
              </button>
              <button type="button" className="btn-cancelar-modal" onClick={onClose}>
                CANCELAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioArbitro;