import React, { useState } from "react";
import "./DetallesDueno.css";
import Navbar from "../../components/navbar/Navbar";
import iconTrophy from "../../assets/trophy-icon.png";
import iconEditar from "../../assets/edit.png";
import iconEliminar from "../../assets/delete.png";
import Buscador from "../../components/buscador/Buscador";
import Swal from "sweetalert2"; // ✅ Importar SweetAlert

const DetallesDueno = () => {
  const [busqueda, setBusqueda] = useState("");
  const [duenos, setDuenos] = useState([
    { nombre: "Javier", apellido: "Rojas", equipo: "Real Madrid", correo: "javier.rx77@gmail.com" },
    { nombre: "Zujeily", apellido: "Madrigal", equipo: "Juventus", correo: "javier.rx77@gmail.com" },
    { nombre: "Juan", apellido: "Chavez", equipo: "Barcelona", correo: "javier.rx77@gmail.com" },
  ]);

  const handleEliminar = (nombre, apellido) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar al dueño ${nombre} ${apellido}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevos = duenos.filter((d) => !(d.nombre === nombre && d.apellido === apellido));
        setDuenos(nuevos);
        Swal.fire({
          title: "Eliminado",
          text: `El dueño ${nombre} ${apellido} fue eliminado correctamente.`,
          icon: "success",
          confirmButtonColor: "#dc3545",
        });
      }
    });
  };

  const filtrados = duenos.filter((d) =>
    `${d.nombre} ${d.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="dueno-container">
        <div className="dueno-header">
          <div className="dueno-title">
            <img src={iconTrophy} alt="icono" />
            <span>Detalles Dueños</span>
          </div>

          <Buscador
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBuscar={() => console.log("Buscar:", busqueda)}
          />
        </div>

        <div className="dueno-tabla">
          <div className="dueno-cabecera">
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Equipo</span>
            <span>Correo</span>
            <span>Acciones</span>
          </div>

          {filtrados.map((dueno, index) => (
            <div className="dueno-fila" key={index}>
              <span>{dueno.nombre}</span>
              <span>{dueno.apellido}</span>
              <span>{dueno.equipo}</span>
              <span>{dueno.correo}</span>
              <span className="acciones">
                <img
                  src={iconEliminar}
                  alt="Eliminar"
                  onClick={() => handleEliminar(dueno.nombre, dueno.apellido)}
                />
                <img src={iconEditar} alt="Editar" />
              </span>
            </div>
          ))}
        </div>

        <div className="dueno-agregar-btn">
          <button>AGREGAR</button>
        </div>
      </div>
    </>
  );
};

export default DetallesDueno;