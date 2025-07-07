import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import ChatBot from './Components/Chatbot';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import { useAuth } from './Context/AuthContext';

function App() {

  const {user} = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/login' element={user? <Navigate to="/dashboard"/>: <Login/>}/>
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
      <ChatBot/>
    </Router>
  );
}

export default App;
