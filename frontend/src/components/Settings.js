import React from 'react';
import {useNavigate} from "react-router-dom";

function Settings({currentUser, setCurrentUser, setToken}) {
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
    <div>
      <h1>Settings</h1>
      <p>This is the Settings page.</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Settings;
