import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Sobre from './pages/Sobre.jsx';
import Contato from './pages/Contato.jsx';
import AppPage from './pages/App.jsx';
import './styles/original.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}> 
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/contato" element={<Contato />} />
        </Route>
        {/* Login fora do layout para não exibir header/footer */}
        <Route path="/login" element={<Login />} />
        {/* Register fora do layout para não exibir header/footer */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);