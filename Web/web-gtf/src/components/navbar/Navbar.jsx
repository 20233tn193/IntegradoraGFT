import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css"; 
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const location = useLocation(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      {/* ✅ Imagen de fondo en el Navbar */}
      <div className="navbar-background"></div>

      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          <img src={Logo} alt="Logo" className="trophy-icon" />
          GTF
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className={`nav-link ${location.pathname === "/dashboard" ? "active-page" : ""}`} to="/dashboard">
              Torneos
            </Link>
            <Link className={`nav-link ${location.pathname === "/menu" ? "active-page" : ""}`} to="/menu">
              Menú
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;