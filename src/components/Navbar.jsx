import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className='bg-black'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/roaster">Roaster Page</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/battlepage">Battle Page</Link></li>
        <li><input></input><Link to="/search">Search Pokemon</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;