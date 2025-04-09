import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./DetallesDueno.css";
import Navbar from "../../components/navbar/Navbar";
import iconTrophy from "../../assets/trophy-icon.png";
import iconEliminar from "../../assets/delete.png";
import Buscador from "../../components/buscador/Buscador";
import Paginador from "../../components/paginador/Paginador";
import Swal from "sweetalert2"; 
import topImage from "../../assets/Top.png";

const DetallesDueno = () => {
  const [busqueda, setBusqueda] = useState("");
  const [duenos, setDuenos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const duenosPorPagina = 10;

  useEffect(() => {
    const fetchDuenos = async () => {
      try {
        const response = await axiosInstance.get("/duenos");
        setDuenos(response.data);
      } catch (error) {
        console.error("Error al obtener dueños:", error);
      }
    };
    fetchDuenos();
  }, []);

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

  const totalPaginas = Math.ceil(filtrados.length / duenosPorPagina);
  const indexUltimo = paginaActual * duenosPorPagina;
  const indexPrimero = indexUltimo - duenosPorPagina;
  const duenosPaginados = filtrados.slice(indexPrimero, indexUltimo);

  return (
    <>
      <Navbar />
      <div className="dueno-background" style={{ backgroundImage: `url(${topImage})` }}></div>
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
            <span>Correo</span>
            <span>Acciones</span>
          </div>

          {duenosPaginados.map((dueno, index) => (
            <div className="dueno-fila" key={index}>
              <span>{dueno.nombre}</span>
              <span>{dueno.apellido}</span>
              <span>{dueno.correo}</span>
              <span className="acciones">
                <img
                  src={iconEliminar}
                  alt="Eliminar"
                  onClick={() => handleEliminar(dueno.nombre, dueno.apellido)}
                />
              </span>
            </div>
          ))}
        </div>

        <Paginador
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          cambiarPagina={setPaginaActual}
        />
      </div>
    </>
  );
};

export default DetallesDueno;
