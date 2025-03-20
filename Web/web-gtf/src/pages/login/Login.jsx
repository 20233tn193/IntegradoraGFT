import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

// Importar imágenes desde `src/assets/`
import topImage from '../../assets/Top.png';
import bottomImage from '../../assets/Botton.png';
import logo from '../../assets/Logo.png';

const Login = () => {
  return (
    <div className="login-container">
      {/* Fondo superior */}
      <div className="login-background" style={{ backgroundImage: `url(${topImage})` }}></div> 

      {/* Fondo inferior */}
      <div className='login-background-bottom' style={{ backgroundImage: `url(${bottomImage})` }}></div>

      {/* Tarjeta de Login */}
      <div className="login-card text-center p-4">
        <img src={logo} alt="Logo" className="login-logo mb-3" />
        <h2 className="mb-3">Inicio de Sesión</h2>
        <input type="email" className="form-control mb-3" placeholder="Correo electrónico" />
        <input type="password" className="form-control mb-3" placeholder="Contraseña" />
        <button className="btn btn-danger w-100">Ingresar</button>
      </div>
    </div>
  );
};

export default Login;