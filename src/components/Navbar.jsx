import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className='bg-slate-100'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/roaster">Roaster Page</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/battlepage">Battle Page</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;