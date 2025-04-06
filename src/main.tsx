import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// import Dash from './components/Dash'; // Adjust path if needed
import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/dashboard" element={<Dash />} /> */}
      </Routes>
    </Router>
  </StrictMode>
);
