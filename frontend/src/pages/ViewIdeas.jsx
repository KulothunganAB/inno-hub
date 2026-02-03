import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ideasAPI } from '../api';

const ViewIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    fetchIdeas();
  }, [navigate]);

  const fetchIdeas = async () => {
    try {
      const response = await ideasAPI.getAll();
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = (idea) => {
    navigate(`/messages?user=${idea.user_id}&idea=${idea.id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading ideas...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1>View All Ideas</h1>
        <p>Explore innovative ideas from the community</p>
      </div>

      {ideas.length > 0 ? (
        <div className="ideas-grid">
          {ideas.map((idea) => (
            <div key={idea.id} className="idea-card">
              <div className="idea-header">
                <h3 className="idea-title">{idea.title}</h3>
                <div>
                  <span className="idea-domain">{idea.domain}</span>
                  <span className="idea-stage">{idea.stage}</span>
                </div>
              </div>
              
              <p className="idea-problem">
                <strong>Problem:</strong> {idea.problem}
              </p>
              
              <p className="idea-problem">
                <strong>Solution:</strong> {idea.solution}
              </p>
              
              <div className="idea-meta">
                <span>👤 {idea.display_name}</span>
                <span>💰 ${idea.funding_amount}</span>
              </div>
              
              <div className="idea-meta">
                <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                <span>User ID: {idea.user_id}</span>
              </div>

              <div className="idea-actions">
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => handleMessage(idea)}
                >
                  💬 Message
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No ideas available</h3>
            <p>Be the first to post an innovative idea!</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ViewIdeas;
