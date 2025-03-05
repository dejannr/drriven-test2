// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setCurrentUser, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          // Store the access token (and optionally the refresh token)
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          setToken(data.access);
          setMessage("Login successful");

          // Optionally, fetch current user info now
          fetch('http://localhost:8000/api/current_user/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.access}`
            }
          })
            .then(res => res.json())
            .then(userData => {
              setCurrentUser({ username: userData.username });
              navigate('/');
            })
            .catch(err => console.error("Error fetching current user", err));
        } else {
          setMessage(data.detail || "Login failed");
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setMessage("Error during login");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
         <div>
           <label>Username:</label>
           <input
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Password:</label>
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
         </div>
         <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
