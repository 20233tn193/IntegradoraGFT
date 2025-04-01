import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./CreateCampos.css";
import topImage from "../../assets/Top.png";
import tropyImage from "../../assets/trophy-icon.png";
import Swal from "sweetalert2";
import MapSelector from "../../components/mapSelector/MapSelector"; 

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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Formulario enviado con:", field);

    Swal.fire({
      title: "Campo creado",
      text: "El campo ha sido agregado exitosamente.",
      icon: "success",
      confirmButtonColor: "#dc3545"
    }).then(() => {
      navigate("/menu");
    });
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

      <div className="create-campo-container">
        <h2 className="title">
          <img src={tropyImage} alt="icono campo" className="title-icon" />
          Crear Campo
        </h2>

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
              <button type="button" className="campo-btn cancelar" onClick={() => navigate("/menu")}>
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
