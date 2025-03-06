import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidepanel({ currentUser, setCurrentUser, setToken }) {
  const location = useLocation();

  return (
    <aside className="drr-sidepanel">
      <div className="logo">drriven<span>.</span></div>
      <div className="links-top">
        {currentUser ? (
          <>
            <Link to="/feed" className={location.pathname === "/feed" ? "active" : ""}>
              <i className="fa-solid fa-compass"></i> Feed
            </Link>
            <Link to="/inbox" className={location.pathname === "/inbox" ? "active" : ""}>
              <i className="fa-solid fa-inbox"></i> Inbox
            </Link>
            <Link to="/news" className={location.pathname === "/news" ? "active" : ""}>
              <i className="fa-solid fa-newspaper"></i> News
            </Link>
            <Link to="/forum" className={location.pathname === "/forum" ? "active" : ""}>
              <i className="fa-solid fa-comments"></i> Forum
            </Link>
            <Link to="/events" className={location.pathname === "/events" ? "active" : ""}>
              <i className="fa-solid fa-calendar-alt"></i> Events
            </Link>
            <Link to="/spotting" className={location.pathname === "/spotting" ? "active" : ""}>
              <i className="fa-solid fa-car"></i> Spotting
            </Link>
          </>
        ) : (
          <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
            Login
          </Link>
        )}
      </div>
      <div className="links-bottom">
        {currentUser && (
          <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
            <i className="fa-solid fa-cog"></i> Settings
          </Link>
        )}
      </div>
    </aside>
  );
}

export default Sidepanel;
