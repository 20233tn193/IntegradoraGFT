import React from "react";
import "./CamposRegistrados.css";
import Navbar from "../../components/navbar/Navbar";
import iconUbicacion from "../../assets/location.png";
import iconEliminar from "../../assets/delete.png";
import iconEditar from "../../assets/edit.png";
import topImage from "../../assets/Top.png";

const camposMock = [
  {
    nombre: "Los Tamales",
    cancha1: "Verde",
    cancha2: "Rojo",
    cancha3: "",
  },
  {
    nombre: "Campo JB",
    cancha1: "1",
    cancha2: "2",
    cancha3: "",
  },
  {
    nombre: "El Corral",
    cancha1: "1",
    cancha2: "",
    cancha3: "",
  },
  {
    nombre: "Matorrales",
    cancha1: "1",
    cancha2: "2",
    cancha3: "3",
  },
];

const CamposRegistrados = () => {
  return (
    <>
      <Navbar />
      <div className="campos-registrados-background" style={{ backgroundImage: `url(${topImage})` }}></div>

      <div className="campos-container">
        <div className="campos-header">
          <img src={iconUbicacion} alt="icono" />
          <span>Detalles Campos</span>
        </div>

        <div className="campos-table-container">
          <table className="campos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cancha 1</th>
                <th>Cancha 2</th>
                <th>Cancha 3</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {camposMock.map((campo, index) => (
                <tr key={index}>
                  <td>{campo.nombre}</td>
                  <td>{campo.cancha1}</td>
                  <td>{campo.cancha2}</td>
                  <td>{campo.cancha3}</td>
                  <td className="acciones">
                    <img src={iconUbicacion} alt="ubicación" className="icono" />
                    <img src={iconEliminar} alt="eliminar" className="icono" />
                    <img src={iconEditar} alt="editar" className="icono" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="boton-agregar">
          <button>AGREGAR</button>
        </div>
      </div>
    </>
  );
};

export default CamposRegistrados;