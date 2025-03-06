// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DataPage from './components/DataPage';
import Posts from './components/Posts';
import Login from './components/Login';
import Sidepanel from './components/Sidepanel';
import PrivateRoute from './components/PrivateRoute';
import Feed from './components/Feed';
import Inbox from './components/Inbox';
import News from './components/News';
import Forum from './components/Forum';
import Events from './components/Events';
import Spotting from './components/Spotting';
import Settings from './components/Settings';

import './css/resetstyle.css';
import './css/index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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
      <Sidepanel currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} />
      <div className="drr-main">
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
            <Route path="/feed" element={<Feed />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/news" element={<News />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/events" element={<Events />} />
            <Route path="/spotting" element={<Spotting />} />
            <Route path="/settings" element={<Settings currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
