import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BetPage from './pages/BetPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/engagement-invite" replace />} />
        <Route path="/engagement-invite" element={<LandingPage />} />
        <Route path="/engagement-invite/bet" element={<BetPage />} />
        <Route path="*" element={<Navigate to="/engagement-invite" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
