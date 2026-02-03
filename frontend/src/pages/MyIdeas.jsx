import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ideasAPI } from '../api';

const MyIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    fetchMyIdeas(userId);
  }, [navigate]);

  const fetchMyIdeas = async (userId) => {
    try {
      const response = await ideasAPI.getByUser(userId);
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (idea) => {
    setEditingId(idea.id);
    setEditFormData({
      title: idea.title,
      domain: idea.domain,
      problem: idea.problem,
      solution: idea.solution,
      stage: idea.stage,
      funding_amount: idea.funding_amount,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (ideaId) => {
    const userId = localStorage.getItem('userId');
    try {
      await ideasAPI.update(ideaId, {
        ...editFormData,
        user_id: parseInt(userId),
      });
      alert('Idea updated successfully!');
      setEditingId(null);
      fetchMyIdeas(userId);
    } catch (error) {
      alert('Error updating idea: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  const handleDelete = async (ideaId) => {
    if (!window.confirm('Are you sure you want to delete this idea?')) {
      return;
    }

    const userId = localStorage.getItem('userId');
    try {
      await ideasAPI.delete(ideaId, parseInt(userId));
      alert('Idea deleted successfully!');
      fetchMyIdeas(userId);
    } catch (error) {
      alert('Error deleting idea: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading your ideas...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1>My Ideas</h1>
        <p>Manage your innovative ideas</p>
      </div>

      {ideas.length > 0 ? (
        <div className="ideas-grid">
          {ideas.map((idea) => (
            <div key={idea.id} className="card">
              {editingId === idea.id ? (
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate(idea.id); }}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Domain</label>
                    <input
                      type="text"
                      name="domain"
                      className="form-control"
                      value={editFormData.domain}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Problem</label>
                    <textarea
                      name="problem"
                      className="form-control"
                      value={editFormData.problem}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Solution</label>
                    <textarea
                      name="solution"
                      className="form-control"
                      value={editFormData.solution}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stage</label>
                    <select
                      name="stage"
                      className="form-control"
                      value={editFormData.stage}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="Idea">Idea</option>
                      <option value="MVP">MVP</option>
                      <option value="Revenue">Revenue</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Funding Amount</label>
                    <input
                      type="number"
                      name="funding_amount"
                      className="form-control"
                      value={editFormData.funding_amount}
                      onChange={handleEditChange}
                      min="0"
                    />
                  </div>
                  <div className="idea-actions">
                    <button type="submit" className="btn btn-success btn-small">
                      Save
                    </button>
                    <button type="button" onClick={handleCancelEdit} className="btn btn-secondary btn-small">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
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
                    <span>💰 ${idea.funding_amount}</span>
                    <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                  </div>

                  <div className="idea-actions">
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => handleEdit(idea)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleDelete(idea.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No ideas yet</h3>
            <p>Start by posting your first innovative idea!</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MyIdeas;
