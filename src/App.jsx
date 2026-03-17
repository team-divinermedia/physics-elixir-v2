import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiagnosticTest from './pages/DiagnosticTest';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diagnostic" element={<DiagnosticTest />} />
      </Routes>
    </Router>
  );
}
