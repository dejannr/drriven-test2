// frontend/src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ currentUser, setCurrentUser, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For JWT, "logout" is typically just removing the token from storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <header style={{ marginBottom: '20px' }}>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '10px' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/data">Data Page</Link></li>
          <li><Link to="/posts">Posts</Link></li>
        </ul>
      </nav>
      <div style={{ marginTop: '10px' }}>
        {currentUser ? (
          <div>
            <span>Welcome, {currentUser.username}!</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
