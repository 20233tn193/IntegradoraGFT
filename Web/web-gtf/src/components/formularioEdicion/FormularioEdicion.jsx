import React, { useState, useEffect } from "react";
import MapSelector from "../../components/mapSelector/MapSelector";
import axiosInstance from "../../api/axiosInstance";

const FormularioEdicion = ({ campo, onClose, onSave }) => {
  const [visibleFields, setVisibleFields] = useState(1);
  const [position, setPosition] = useState({ lat: campo.latitud, lng: campo.longitud });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [field, setField] = useState({
    id: campo.id,
    nombre: campo.nombreCampo || "",
    cancha1: campo.canchas?.[0]?.nombreCancha || "",
    cancha2: campo.canchas?.[1]?.nombreCancha || "",
    cancha3: campo.canchas?.[2]?.nombreCancha || "",
    eliminado: campo.eliminado,
    disponible: campo.disponible,
    ubicacion: {
      lat: campo.latitud,
      lng: campo.longitud,
    },
  });

  useEffect(() => {
    setVisibleFields(field.cancha3 ? 3 : field.cancha2 ? 2 : 1);
  }, [campo]);

  useEffect(() => {
    if (position) {
      setField((prev) => ({
        ...prev,
        ubicacion: position,
      }));
    }
  }, [position]);

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const mostrarOtraCancha = () => {
    if (visibleFields < 3) setVisibleFields(visibleFields + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const canchas = [];
    if (field.cancha1?.trim()) canchas.push({ nombreCancha: field.cancha1.trim() });
    if (field.cancha2?.trim()) canchas.push({ nombreCancha: field.cancha2.trim() });
    if (field.cancha3?.trim()) canchas.push({ nombreCancha: field.cancha3.trim() });

    const campoActualizado = {
      id: field.id,
      nombreCampo: field.nombre,
      latitud: field.ubicacion.lat,
      longitud: field.ubicacion.lng,
      eliminado: field.eliminado || false,
      disponible: field.disponible || true,
      canchas: canchas,
    };

    console.log("✅ JSON que se enviará al backend:", JSON.stringify(campoActualizado, null, 2));

    try {
      const response = await axiosInstance.put(`/campos/${campoActualizado.id}`, campoActualizado);
      console.log("🛠️ Campo actualizado:", response.data);

      if (onSave) await onSave(response.data);
      if (onClose) onClose();
    } catch (error) {
      console.error("❌ Error al actualizar el campo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="campo-form" onSubmit={handleSubmit}>
      <div className="left-section">
        <label htmlFor="nombre">Nombre del Campo: *</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={field.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="cancha1">Nombre cancha 1: *</label>
        <input
          id="cancha1"
          type="text"
          name="cancha1"
          value={field.cancha1}
          onChange={handleChange}
          required
        />

        {visibleFields >= 2 && (
          <>
            <label htmlFor="cancha2">Nombre cancha 2:</label>
            <input
              id="cancha2"
              type="text"
              name="cancha2"
              value={field.cancha2}
              onChange={handleChange}
            />
          </>
        )}

        {visibleFields >= 3 && (
          <>
            <label htmlFor="cancha3">Nombre cancha 3:</label>
            <input
              id="cancha3"
              type="text"
              name="cancha3"
              value={field.cancha3}
              onChange={handleChange}
            />
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
