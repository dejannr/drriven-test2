// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DataPage from './components/DataPage';
import Posts from './components/Posts';
import Login from './components/Login';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  // Optionally, on app load, if token exists, fetch current user info
  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.username) {
            setCurrentUser({ username: data.username });
          } else {
            setCurrentUser(null);
          }
        })
        .catch(error => console.error("Error fetching current user:", error));
    }
  }, [token]);

  return (
    <Router>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<DataPage token={token} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setToken={setToken} />} />
        <Route
          path="/posts"
          element={
            <PrivateRoute token={token}>
              <Posts token={token} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
