import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home';
import RosterPage from './pages/RosterPage.jsx';
import Leaderboard from './pages/Leaderboard';
import BattlePage from './pages/BattlePage.jsx';
import './components/PokemonCard.jsx';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/battle" element={<BattlePage />} />
        
      </Routes>
    </div>
  );
}

export default App;
