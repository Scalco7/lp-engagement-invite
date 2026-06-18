import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BetPage from './pages/BetPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bet" element={<BetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
