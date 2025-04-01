import React, { useState } from "react";
import "./TorneosRegistrados.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import topImage from "../../assets/Top.png";
import iconVer from "../../assets/details.png";
import iconDetalles from "../../assets/details.png";
import iconEditar from "../../assets/edit.png";
import iconEliminar from "../../assets/delete.png";
import Swal from "sweetalert2";
import FormularioEditarTorneo from "../../components/formularioEditarTorneo/FormularioEditarTorneo";


const torneosMock = [
  {
    nombre: "Torneo de Veteranos",
    numEquipos: 10,
    fechaInicio: "2025-03-05",
    estado: "ABIERTO",
    costo: "$800",
  },
  {
    nombre: "Torneo Infantil",
    numEquipos: 8,
    fechaInicio: "2025-03-05",
    estado: "FINALIZADO",
    costo: "$200",
  },
  {
    nombre: "Torneo Estatal",
    numEquipos: 20,
    fechaInicio: "2025-03-05",
    estado: "CERRADO",
    costo: "$1200",
  },
  {
    nombre: "Torneo ABC",
    numEquipos: 5,
    fechaInicio: "2025-03-05",
    estado: "ACTIVO",
    costo: "$80",
  },
];

const TorneosRegistrados = () => {
  const navigate = useNavigate();

  const [torneoEditando, setTorneoEditando] = useState(null);

  const handleEliminarTorneo = (torneo) => {
    Swal.fire({
      title: "¿Estás seguro?",
      html: `¿Quieres eliminar el <strong>${torneo.nombre}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: `El ${torneo.nombre} ha sido eliminado correctamente.`,
          icon: "success",
          confirmButtonColor: "#dc3545",
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div
        className="torneos-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>

      <div className="torneos-container">
        <div className="torneos-header">
          <img src={iconVer} alt="icon" />
          <span>Detalles Torneos</span>
        </div>

        <div className="torneos-table-container">
          <table className="torneos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Num. Equipos</th>
                <th>Fecha Inicio</th>
                <th>Estado</th>
                <th>Costo</th>
                <th className="acciones-columna">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {torneosMock.map((torneo, index) => (
                <tr key={index}>
                  <td>{torneo.nombre}</td>
                  <td>{torneo.numEquipos}</td>
                  <td>{torneo.fechaInicio}</td>
                  <td>{torneo.estado}</td>
                  <td>{torneo.costo}</td>
                  <td className="acciones-columna">
                    <div className="acciones">
                      <img
                        src={iconDetalles}
                        className="icono"
                        alt="ver"
                        onClick={() => navigate("/detalle-inscripciones")}
                      />{" "}
                      <img
                        src={iconEditar}
                        alt="editar"
                        className="icono"
                        onClick={() => setTorneoEditando(torneo)}
                      />
                      <img
                        src={iconEliminar}
                        className="icono"
                        alt="eliminar"
                        onClick={() => handleEliminarTorneo(torneo)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de edición */}
        {torneoEditando && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: "900px" }}>
              <h3 className="title-detalles">Editar Torneo</h3>
              <FormularioEditarTorneo
                torneo={torneoEditando}
                onClose={() => setTorneoEditando(null)}
                onSave={(torneoActualizado) => {
                  console.log("Torneo actualizado:", torneoActualizado);
                  setTorneoEditando(null);
                  // Aquí puedes actualizar la lista si conectas con backend
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TorneosRegistrados;
