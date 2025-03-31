import React, { useState, useEffect } from "react";
import MapSelector from "../../components/mapSelector/MapSelector";

const FormularioEdicion = ({ campo, onClose, onSave }) => {
  const [field, setField] = useState({ ...campo });
  const [visibleFields, setVisibleFields] = useState(1);
  const [position, setPosition] = useState(campo.ubicacion);

  useEffect(() => {
    setVisibleFields(
      campo.cancha3 ? 3 : campo.cancha2 ? 2 : 1
    );
  }, [campo]);

  useEffect(() => {
    setField((prev) => ({ ...prev, ubicacion: position }));
  }, [position]);

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const mostrarOtraCancha = () => {
    if (visibleFields < 3) setVisibleFields(visibleFields + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(field);
  };

  return (
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
          <button type="button" onClick={mostrarOtraCancha} className="add-field-btn">
            + Añadir cancha
          </button>
        )}
      </div>

      <div className="right-section">
        <label>Seleccionar Ubicación: *</label>
        <MapSelector position={position} setPosition={setPosition} />
        <div className="campo-button-group">
          <button type="submit" className="campo-btn crear">GUARDAR</button>
          <button type="button" className="campo-btn cancelar" onClick={onClose}>CANCELAR</button>
        </div>
      </div>
    </form>
  );
};

export default FormularioEdicion;