import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/loading/Loading";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateTournament from "./pages/createTournament/CreateTournament";
import TournamentDetails from "./pages/tournamentDetails/TournamentDetails"; // ✅ Importamos la pantalla de detalles del torneo

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simula la pantalla de carga
  }, []);

  return (
    <div className="app-container">
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/crear-torneo" element={isAuthenticated ? <CreateTournament /> : <Navigate to="/login" />} />
          
          {/* ✅ Nueva ruta para ver detalles de un torneo según su ID */}
          <Route path="/torneo/:id" element={isAuthenticated ? <TournamentDetails /> : <Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;