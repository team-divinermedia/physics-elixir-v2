import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiagnosticTest from './pages/DiagnosticTest';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiagnosticTest />} />
      </Routes>
    </Router>
  );
}
