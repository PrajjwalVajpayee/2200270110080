// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UrlShortenerPage from './pages/URLShortnerPage';
// import StatsPage from './pages/StatsPage'; // <-- jab banega tab add kar dena

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<UrlShortenerPage />} />

        {/* Analytics page (future-proofed) */}
        {/* <Route path="/stats/:id" element={<StatsPage />} /> */}

        {/* Catch-all → redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
