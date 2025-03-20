import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importación correcta
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

// ✅ Importa las imágenes correctamente desde `src/assets/`
import topImage from '../../assets/Top.png';
import bottomImage from '../../assets/Botton.png';
import logo from '../../assets/Logo.png';

const Login = ({ setAuth }) => {
  const navigate = useNavigate(); // ✅ Hook para la navegación

  const handleLogin = () => {
    setAuth(true); // ✅ Actualiza el estado de autenticación
    navigate('/dashboard'); // ✅ Redirige al Dashboard después de iniciar sesión
  };

  return (
    <div className="login-container">
      {/* ✅ Usa las imágenes importadas en `style={{ backgroundImage: ... }}` */}
      <div className="login-background" style={{ backgroundImage: `url(${topImage})` }}></div>
      <div className="login-background-bottom" style={{ backgroundImage: `url(${bottomImage})` }}></div>

      {/* Tarjeta de Login */}
      <div className="login-card text-center p-4">
        <img src={logo} alt="Logo" className="login-logo mb-3" />
        <h2 className="mb-3">Inicio de Sesión</h2>
        <input type="email" className="form-control mb-3" placeholder="Correo electrónico" />
        <input type="password" className="form-control mb-3" placeholder="Contraseña" />
        <button className="btn btn-danger w-100" onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  );
};

export default Login;