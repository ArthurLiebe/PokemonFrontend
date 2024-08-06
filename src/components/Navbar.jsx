import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <nav className="navbar flex items-center justify-between p-4 bg-slate-100">
      <div className="navbar-content flex flex-1 justify-center space-x-6">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/roster" className="nav-link">My Roster</Link>
        <Link to="/battle" className="nav-link">Battle</Link>
        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;