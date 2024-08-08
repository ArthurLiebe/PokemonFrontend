import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-primary-content justify-center">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-2xl">Pokémon: Battle Game</Link>
      </div>

      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
        <li><Link to="/" className="text-xl">Home</Link></li>
          <li><Link to="/roster" className="text-xl">My Roster</Link></li>
          <li><Link to="/battle" className="text-xl">Battle</Link></li>
          <li><Link to="/leaderboard" className="text-xl">Leaderboard</Link></li>
        </ul>
      </div>

      <div className="navbar-end"></div>
    </div>
  );
};

export default Navbar