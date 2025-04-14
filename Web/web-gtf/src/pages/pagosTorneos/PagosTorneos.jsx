import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Buscador from "../../components/buscador/Buscador";
import "./PagosTorneos.css";
import iconTrophy from "../../assets/trophy-icon.png";
import iconCheck from "../../assets/palomita.png";
import iconClose from "../../assets/equis.png";
import topImage from "../../assets/Top.png";
import axiosInstance from "../../api/axiosInstance";
import Paginador from "../../components/paginador/Paginador";
import Swal from "sweetalert2";
import Loading from "../../components/loading/Loading"; // ✅ Importación

const PagosTorneos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Estado de carga

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const pagosPorPagina = 10;
  const indexUltimo = currentPage * pagosPorPagina;
  const indexPrimero = indexUltimo - pagosPorPagina;

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const response = await axiosInstance.get("/pagos/detallados");
        setPagos(response.data);
      } catch (error) {
        console.error("Error al obtener pagos:", error);
      } finally {
        setLoading(false); // ✅ Ocultar loading
      }
    };

    fetchPagos();
  }, []);

  const handleActualizarPago = async (id, accion) => {
    try {
      await axiosInstance.put(`/pagos/${id}/${accion}`);
      setPagos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estatus: accion === "aprobar" ? "pagado" : "rechazado" } : p
        )
      );
      Swal.fire("Éxito", `Pago ${accion === "aprobar" ? "aprobado" : "rechazado"} correctamente`, "success");
    } catch (error) {
      console.error("Error al actualizar pago:", error);
      Swal.fire("Error", "No se pudo actualizar el pago", "error");
    }
  };

  const filtrados = pagos.filter((p) =>
    (p.duenoNombre || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const pagosPaginados = filtrados.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(filtrados.length / pagosPorPagina);

  return (
    <>
      <Navbar />
      <div className="pagos-background" style={{ backgroundImage: `url(${topImage})` }}></div>

      {loading ? (
        <Loading />
      ) : (
        <div className="pagos-container">
          <div className="pagos-header">
            <div className="pagos-title">
              <img src={iconTrophy} alt="icon" />
              <span>Pagos de Torneos</span>
            </div>
            <Buscador
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onBuscar={() => {}}
            />
          </div>

          <div className="pagos-tabla">
            <div className="pagos-cabecera">
              <span>Tipo</span>
              <span>Dueño</span>
              <span>Equipo</span>
              <span>Torneo</span>
              <span>Fecha Pago</span>
              <span>Estatus</span>
              <span>Aprobar Pago</span>
            </div>

            {pagosPaginados.map((pago, index) => (
              <div className="pagos-fila" key={index}>
                <span>{pago.tipo}</span>
                <span>{pago.duenoNombre}</span>
                <span>{pago.equipoNombre}</span>
                <span>{pago.torneoNombre}</span>
                <span>{pago.fechaPago?.split("T")[0]}</span>
                <span>{pago.estatus}</span>
                <span className="acciones">
                  <img
                    src={iconCheck}
                    alt="check"
                    className={`icono ${pago.estatus === "pagado" ? "visible" : ""}`}
                    onClick={() => handleActualizarPago(pago.id, "aprobar")}
                    style={{ opacity: pago.estatus === "rechazado" ? 0.3 : 1 }}
                  />
                  <img
                    src={iconClose}
                    alt="close"
                    className={`icono ${pago.estatus === "rechazado" ? "visible" : ""}`}
                    onClick={() => handleActualizarPago(pago.id, "rechazar")}
                    style={{ opacity: pago.estatus === "pagado" ? 0.3 : 1 }}
                  />
                </span>
              </div>
            ))}
          </div>

          <Paginador
            totalPaginas={totalPaginas}
            paginaActual={currentPage}
            cambiarPagina={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default PagosTorneos;