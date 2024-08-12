import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-primary-content justify-center font-press-start">
      <div className="navbar-center w-full justify-between">
        <ul className="menu menu-horizontal px-1 w-full gap-16">
          <li className="flex-grow">
            <Link to="/" className="btn bg-transparent hover:bg-yellow-600 w-full text-center">Pokémon: Battle Game</Link>
          </li>
          <li className="flex-grow">
            <Link to="/roster" className="btn bg-transparent hover:bg-yellow-600 w-full text-center">My Roster</Link>
          </li>
          <li className="flex-grow">
            <Link to="/battle" className="btn bg-transparent hover:bg-yellow-600 w-full text-center">Battle</Link>
          </li>
          <li className="flex-grow">
            <Link to="/leaderboard" className="btn bg-transparent hover:bg-yellow-600 w-full text-center">Leaderboard</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end"></div>
    </div>
  );
};

export default Navbar;