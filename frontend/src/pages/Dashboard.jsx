import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ideasAPI } from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalIdeas: 0,
    totalMessages: 0,
    recentIdeas: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    fetchDashboardData(userId);
  }, [navigate]);

  const fetchDashboardData = async (userId) => {
    try {
      const response = await ideasAPI.getDashboardStats(userId);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading dashboard...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your innovation overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>Total Ideas Posted</h3>
          <div className="stat-value">{stats.totalIdeas}</div>
        </div>
        <div className="stat-card green">
          <h3>Messages Received</h3>
          <div className="stat-value">{stats.totalMessages}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Recent Ideas</h2>
        </div>
        {stats.recentIdeas.length > 0 ? (
          <div className="ideas-grid">
            {stats.recentIdeas.map((idea) => (
              <div key={idea.id} className="idea-card">
                <div className="idea-header">
                  <h3 className="idea-title">{idea.title}</h3>
                  <div>
                    <span className="idea-domain">{idea.domain}</span>
                    <span className="idea-stage">{idea.stage}</span>
                  </div>
                </div>
                <p className="idea-problem">{idea.problem.substring(0, 150)}...</p>
                <div className="idea-meta">
                  <span>💰 ${idea.funding_amount}</span>
                  <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No ideas yet</h3>
            <p>Start by posting your first innovative idea!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
