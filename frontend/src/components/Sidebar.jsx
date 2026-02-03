import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>InnoHub</h1>
        <p>Innovation Hub</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-link">
          <span className="nav-link-icon">📊</span>
          Dashboard
        </NavLink>
        <NavLink to="/post-idea" className="nav-link">
          <span className="nav-link-icon">💡</span>
          Post Idea
        </NavLink>
        <NavLink to="/view-ideas" className="nav-link">
          <span className="nav-link-icon">🔍</span>
          View Ideas
        </NavLink>
        <NavLink to="/my-ideas" className="nav-link">
          <span className="nav-link-icon">📝</span>
          My Ideas
        </NavLink>
        <NavLink to="/messages" className="nav-link">
          <span className="nav-link-icon">💬</span>
          Messages
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          <span className="nav-link-icon">👤</span>
          Profile
        </NavLink>
      </nav>
      <button onClick={handleLogout} className="logout-btn">
        🚪 Logout
      </button>
    </div>
  );
};

export default Sidebar;
