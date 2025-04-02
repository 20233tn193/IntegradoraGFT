import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

import Loading from "./components/loading/Loading";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateTournament from "./pages/createTournament/CreateTournament";
import TournamentDetails from "./pages/tournamentDetails/TournamentDetails";
import DashboardStatistics from "./pages/DashboardStatistics/DashboardStatistics";
import UpcomingMatches from "./pages/upcomingMatches/UpcomingMatches";
import Menu from "./pages/menu/Menu";
import CreateCampos from "./pages/createCampos/CreateCampos";
import CamposRegistrados from "./pages/camposRegistrados/CamposRegistrados";
import TorneosRegistrados from "./pages/torneosRegistrados/TorneosRegistrados";
import DetallesInscripciones from "./pages/detallesInscripciones/DetallesInscripciones";
import CrearArbitro from "./pages/crearArbitro/CrearArbitro";
import ListaArbitros from "./pages/listaArbitros/ListaArbitros";
import PagosTorneos from "./pages/pagosTorneos/PagosTorneos"; // ✅ Importa la nueva pantalla


// ✅ Nueva pantalla
import DetallesDueno from "./pages/detallesDueno/DetallesDueno"; // Asegúrate de que exista

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="app-container">
      {isLoading ? (
        <Loading />
      ) : (
        <LoadScript
          googleMapsApiKey="AIzaSyDLXqQxUwiCBJexRiltkN9ft7ViI0U2c0s"
          libraries={["places"]}
        >
          <Routes>
            <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/crear-torneo" element={isAuthenticated ? <CreateTournament /> : <Navigate to="/login" />} />
            <Route path="/torneo/:id" element={isAuthenticated ? <TournamentDetails /> : <Navigate to="/login" />} />
            <Route path="/dashboard-statistics" element={isAuthenticated ? <DashboardStatistics /> : <Navigate to="/login" />} />
            <Route path="/upcoming-matches" element={isAuthenticated ? <UpcomingMatches /> : <Navigate to="/login" />} />
            <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
            <Route path="/create-campos" element={isAuthenticated ? <CreateCampos /> : <Navigate to="/login" />} />
            <Route path="/ver-campos" element={isAuthenticated ? <CamposRegistrados /> : <Navigate to="/login" />} />
            <Route path="/ver-torneos" element={isAuthenticated ? <TorneosRegistrados /> : <Navigate to="/login" />} />
            <Route path="/detalle-inscripciones" element={isAuthenticated ? <DetallesInscripciones /> : <Navigate to="/login" />} />
            <Route path="/crear-arbitro" element={isAuthenticated ? <CrearArbitro /> : <Navigate to="/login" />} />
            <Route path="/lista-arbitros" element={isAuthenticated ? <ListaArbitros /> : <Navigate to="/login" />} />
            <Route path="/detalles-duenos" element={isAuthenticated ? <DetallesDueno /> : <Navigate to="/login" />} />
            <Route path="/pagos-torneos" element={isAuthenticated ? <PagosTorneos /> : <Navigate to="/login" />} />
          </Routes>
        </LoadScript>
      )}
    </div>
  );
};

export default App;