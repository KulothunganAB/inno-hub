import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostIdea from './pages/PostIdea';
import ViewIdeas from './pages/ViewIdeas';
import MyIdeas from './pages/MyIdeas';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-idea" element={<PostIdea />} />
        <Route path="/view-ideas" element={<ViewIdeas />} />
        <Route path="/my-ideas" element={<MyIdeas />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
