import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css"; 
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        {/* ✅ Logo y nombre */}
        <Link className="navbar-brand" to="/dashboard">
          <img src={Logo} alt="Logo" className="trophy-icon" />
          GTF
        </Link>

        {/* ✅ Botón hamburguesa para dispositivos pequeños */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Opciones del menú */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" to="/dashboard">Torneos</Link>
            <Link className="nav-link" to="/menu">Menú</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;