import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Menu.css";
import torneosIcon from "../../assets/trophy-icon.png";
import camposIcon from "../../assets/campo.png";
import pagosIcon from "../../assets/pagos.png";
import arbitrosIcon from "../../assets/arbrito.png";
import duenosIcon from "../../assets/Dueño.png";
import cerrarIcon from "../../assets/Exit.png";
import configIcon from "../../assets/Conf.png";
import proyecM from "../../assets/ProyectM.png";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ Importante para los accordion

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-screen">
      <Navbar />

      <div className="menu-container">
        <div className="menu-header">
          <img src={configIcon} alt="config" />
          Configuraciones
        </div>

        <div className="accordion accordion-flush" id="menuAccordion">

          {/* Torneos */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed menu-card"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-torneos"
                aria-expanded="false"
                aria-controls="flush-torneos"
              >
                <img src={torneosIcon} alt="torneo" />
                <span>Torneos</span>
              </button>
            </h2>
            <div
              id="flush-torneos"
              className="accordion-collapse collapse"
              data-bs-parent="#menuAccordion"
            >
              <div className="accordion-body">
                <div onClick={() => navigate("/dashboard")}>Ver Torneos</div>
                <hr />
                <div onClick={() => navigate("/crear-torneo")}>Crear Torneo</div>
              </div>
            </div>
          </div>

          {/* Campos */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed menu-card"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-campos"
                aria-expanded="false"
                aria-controls="flush-campos"
              >
                <img src={camposIcon} alt="campo" />
                <span>Campos</span>
              </button>
            </h2>
            <div
              id="flush-campos"
              className="accordion-collapse collapse"
              data-bs-parent="#menuAccordion"
            >
              <div className="accordion-body">
                <div>Ver Campos</div>
                <hr />
                <div onClick={() => navigate("/create-campos")}>Crear Campo</div>
                </div>
            </div>
          </div>

          {/* Árbitros */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed menu-card"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-arbitros"
                aria-expanded="false"
                aria-controls="flush-arbitros"
              >
                <img src={arbitrosIcon} alt="arbitros" />
                <span>Árbitros</span>
              </button>
            </h2>
            <div
              id="flush-arbitros"
              className="accordion-collapse collapse"
              data-bs-parent="#menuAccordion"
            >
              <div className="accordion-body">
                <div>Ver Árbitros</div>
                <hr />
                <div>Crear Árbitro</div>
              </div>
            </div>
          </div>

          {/* Dueños */}
          <div className="menu-card" onClick={() => navigate("/")}>
            <img src={duenosIcon} alt="dueños" />
            <span>Dueños</span>
          </div>

          {/* Pagos */}
          <div className="menu-card" onClick={() => navigate("/")}>
            <img src={pagosIcon} alt="pagos" />
            <span>Pagos</span>
          </div>

          {/* Cerrar sesión */}
          <div className="menu-card" onClick={() => navigate("/login")}>
            <img src={cerrarIcon} alt="cerrar" />
            <span>Cerrar sesión</span>
          </div>
        </div>

        {/* Footer */}
        <div className="menu-footer">
          <img src={proyecM} alt="manhattan" />
        </div>
      </div>
    </div>
  );
};

export default Menu;