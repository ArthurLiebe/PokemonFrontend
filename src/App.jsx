import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home';
import RoasterPage from './pages/RoasterPage';
import Leaderboard from './pages/Leaderboard';
import BattlePage from './pages/BattlePage.jsx';
import './components/PokemonCard.jsx';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roaster" element={<RoasterPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/battlepage" element={<BattlePage />} />
        
      </Routes>
    </div>
  );
}


export default App;
