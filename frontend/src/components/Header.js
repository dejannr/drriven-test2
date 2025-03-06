// frontend/src/components/Header.js
import React from 'react';

function Header({ currentUser }) {
  return (
    <header className="drr-header-main">
      <div className="logo">drriven.</div>
      <div className="user-info">
        {currentUser ? currentUser.username : ''}
      </div>
    </header>
  );
}

export default Header;
