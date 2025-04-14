import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

import topImage from '../../assets/Top.png';
import bottomImage from '../../assets/Botton.png';
import logo from '../../assets/Logo.png';
import axios from 'axios';
import API_BASE_URL from '../../api/config';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !contrasena) {
      setErrorMessage('Por favor, ingrese correo y contraseña');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password: contrasena
      });

      const { token, rol } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);

      setAuth(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      if (error.response && error.response.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response && error.response.status === 401) {
        setErrorMessage('Correo o contraseña incorrectos');
      } else {
        setErrorMessage('No se pudo iniciar sesión. Intente más tarde.');
      }
    }
  };

  return (
    <div className="login-container">
      <div
        className="login-background"
        style={{ backgroundImage: `url(${topImage})` }}
      ></div>
      <div
        className="login-background-bottom"
        style={{ backgroundImage: `url(${bottomImage})` }}
      ></div>

      <div className="login-card text-center p-4">
        <img src={logo} alt="Logo" className="login-logo mb-3" />
        <h2 className="mb-3">Inicio de Sesión</h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="position-relative mb-3">
          <input
            type={mostrarContrasena ? 'text' : 'password'}
            className="form-control pe-5"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <span
            onClick={() => setMostrarContrasena(!mostrarContrasena)}
            className="position-absolute top-50 end-0 translate-middle-y me-3"
            style={{ cursor: "pointer" }}
          >
            <Icon path={mostrarContrasena ? mdiEyeOff : mdiEye} size={1} />
          </span>
        </div>

        <button className="btn btn-danger w-100" onClick={handleLogin}>
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Login;