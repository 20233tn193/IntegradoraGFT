import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./CreateCampos.css";
import topImage from "../../assets/Top.png";
import tropyImage from "../../assets/trophy-icon.png";
import Swal from "sweetalert2";
import MapSelector from "../../components/mapSelector/MapSelector"; 
import axiosInstance from "../../api/axiosInstance";  // Usa axiosInstance en lugar de axios
import API_BASE_URL from "../../api/config"; // Asegúrate de que esta URL esté bien configurada

const CreateCampos = () => {
  const navigate = useNavigate();

  const [field, setField] = useState({
    nombre: "",
    cancha1: "",
    cancha2: "",
    cancha3: "",
    ubicacion: {
      lat: 20.659698, 
      lng: -103.349609,
    },
  });

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  // Función de validación básica
  const validateForm = () => {
    if (!field.nombre || !field.cancha1 || !field.ubicacion) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos obligatorios.",
        icon: "error",
        confirmButtonColor: "#dc3545"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoCampo = {
      nombreCampo: field.nombre, 
      canchas: [
        {
          nombreCancha: field.cancha1 
        }
      ],
      latitud: field.ubicacion.lat || 0, // Asegúrate de que 'field.ubicacion.lat' tenga el valor correcto o pon un valor por defecto (0)
      longitud: field.ubicacion.lng || 0, // Lo mismo para longitud
      eliminado: field.eliminado || false, // Si no se pasa el valor, se establece en false por defecto
      disponible: field.disponible || true // Lo mismo para disponibilidad, si no se pasa el valor, se establece en true
    };

    try {
      const response = await axiosInstance.post("/campos", nuevoCampo);
      console.log("Campo creado:", response.data);
      Swal.fire({
        title: "Campo creado",
        text: "El campo ha sido registrado exitosamente.",
        icon: "success",
        confirmButtonColor: "#198754"
      }).then(() => {
        navigate("/ver-campos"); // Redirige a la lista de campos después de la creación exitosa
      });
    } catch (error) {
      console.error("Error al crear campo:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el campo.",
        icon: "error",
        confirmButtonColor: "#dc3545"
      });
    }
};

  const [visibleFields, setVisibleFields] = useState(1);
  const mostrarOtraCancha = () => {
    if (visibleFields < 3) setVisibleFields(visibleFields + 1);
  };

  const [position, setPosition] = useState({ lat: 20.659698, lng: -103.349609 });

  useEffect(() => {
    setField(prev => ({
      ...prev,
      ubicacion: position,
    }));
  }, [position]);  

  return (
    <>
      <Navbar />

      <div className="create-campo-background" style={{ backgroundImage: `url(${topImage})` }}></div>
      <h2 className="title">
        <img src={tropyImage} alt="icono campo" className="title-icon" />
        Crear Campo
      </h2>
      <div className="create-campo-container">
        <form className="campo-form" onSubmit={handleSubmit}>
          <div className="left-section">
            <label>Nombre del Campo: *</label>
            <input type="text" name="nombre" value={field.nombre} onChange={handleChange} required />

            <label>Nombre cancha 1: *</label>
            <input type="text" name="cancha1" value={field.cancha1} onChange={handleChange} required />

            {visibleFields >= 2 && (
              <>
                <label>Nombre cancha 2:</label>
                <input type="text" name="cancha2" value={field.cancha2} onChange={handleChange} />
              </>
            )}

            {visibleFields >= 3 && (
              <>
                <label>Nombre cancha 3:</label>
                <input type="text" name="cancha3" value={field.cancha3} onChange={handleChange} />
              </>
            )}

            {visibleFields < 3 && (
              <button
                type="button"
                onClick={mostrarOtraCancha}
                className="add-field-btn"
              >
                + Añadir cancha
              </button>
            )}
          </div>

          <div className="right-section">
            <label>Seleccionar Ubicación: *</label>
            <MapSelector position={position} setPosition={setPosition} />
            <div className="campo-button-group">
              <button type="submit" className="campo-btn crear">CREAR</button>
              <button type="button" className="campo-btn cancelar" onClick={() => navigate("/ver-campos")}>
                CANCELAR
              </button>
            </div>
          </div>
        </form>
      </div>
      
    </>
  );
};

export default CreateCampos;