import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import PokemonDetails from "./components/PokemonDetails";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);