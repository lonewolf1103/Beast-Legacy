import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import Auth from './Pages/Auth';
import Onboarding from "./Pages/OnBoarding"
import { useAuth } from './Context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* 🏠 Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* 🔐 Auth Page */}
        <Route
          path="/auth"
          element={user ? <Navigate to="/onboarding" /> : <Auth />}
        />

        {/* ♻️ Legacy redirects */}
        <Route path="/signup" element={<Navigate to="/auth" />} />
        <Route path="/login" element={<Navigate to="/auth" />} />

        {/* 🧠 Onboarding */}
        <Route
          path="/onboarding"
          element={user ? <Onboarding /> : <Navigate to="/auth" />}
        />

        {/* 🧱 Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
