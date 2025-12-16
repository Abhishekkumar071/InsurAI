import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import AgentPages from './components/AgentPages';
import Home from './components/Home';
import About from './components/About';
import Policies from './components/Policies';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute requiredRole="USER"><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/policies/:category" element={<ProtectedRoute requiredRole="USER"><Policies /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="AGENT"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/agent" element={<ProtectedRoute requiredRole="AGENT"><AgentPages /></ProtectedRoute>} />
      </Routes>
      {/* Render About at the bottom of every page */}
      <About />
    </Router>
  );
}

export default App;
