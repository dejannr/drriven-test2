// frontend/src/components/Sidepanel.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidepanel({ currentUser, setCurrentUser, setToken }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Remove tokens and update state
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <aside className="drr-sidepanel">
      <div className="links-top">
        {currentUser ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/data">Data Page</Link>
            <Link to="/posts">Posts</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <div className="links-bottom">
        {currentUser && (
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>
    </aside>
  );
}

export default Sidepanel;
