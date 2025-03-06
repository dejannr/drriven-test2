// frontend/src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ currentUser, setCurrentUser, setToken }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    // Optionally prevent default behavior if needed
    // e.preventDefault();

    // Remove tokens and update state
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setCurrentUser(null);

    // Navigate to login page (optional if Link already handles navigation)
    // navigate('/login');
  };


  return (
    <header class="drr-header-main">
        <div className="logo">drriven.</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/data">Data Page</Link></li>
          <li><Link to="/posts">Posts</Link></li>
        </ul>
      </nav>
      <div>
        {currentUser ? (
          <div>
            <span>Welcome, {currentUser.username}!</span>
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
