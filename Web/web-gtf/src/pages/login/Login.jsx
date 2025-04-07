import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importación correcta
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import topImage from '../../assets/Top.png';
import bottomImage from '../../assets/Botton.png';
import logo from '../../assets/Logo.png';
import axios from 'axios';
import API_BASE_URL from '../../api/config'; // Asegúrate de que este archivo exista y tenga la URL de tu API

const Login = ({ setAuth }) => {
  const navigate = useNavigate(); // ✅ Hook para la navegación
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar el mensaje de error

  const handleLogin = async () => {
    // Validación de campos vacíos
    if (!email || !contrasena) {
      setErrorMessage('Por favor, ingrese correo y contraseña correctos');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password: contrasena
      });

      const { token, rol } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol); // ✅ Guarda el rol en localStorage

      setAuth(true);

      navigate('/dashboard'); // Redirigir al dashboard una vez iniciado sesión
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Correo o contraseña incorrectos'); // Si el error es 401, muestra el mensaje correspondiente
      } else {
        setErrorMessage('Hubo un problema al iniciar sesión. Intenta de nuevo.');
      }
    }
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
        
        {/* Mostrar el mensaje de error */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button className="btn btn-danger w-100" onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  );
};

export default Login;