import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ideasAPI } from '../api';

const PostIdea = () => {
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    problem: '',
    solution: '',
    stage: 'Idea',
    funding_amount: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const userId = localStorage.getItem('userId');

    try {
      await ideasAPI.create({
        ...formData,
        user_id: parseInt(userId),
      });

      setSuccess('Idea posted successfully!');
      setTimeout(() => {
        navigate('/my-ideas');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post idea. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Post New Idea</h1>
        <p>Share your innovative idea with the community</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label>Idea Title *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your idea title"
              required
            />
          </div>

          <div className="form-group">
            <label>Domain *</label>
            <input
              type="text"
              name="domain"
              className="form-control"
              value={formData.domain}
              onChange={handleChange}
              placeholder="e.g., HealthTech, FinTech, EdTech"
              required
            />
          </div>

          <div className="form-group">
            <label>Problem Statement *</label>
            <textarea
              name="problem"
              className="form-control"
              value={formData.problem}
              onChange={handleChange}
              placeholder="Describe the problem your idea solves"
              required
            />
          </div>

          <div className="form-group">
            <label>Solution *</label>
            <textarea
              name="solution"
              className="form-control"
              value={formData.solution}
              onChange={handleChange}
              placeholder="Describe your proposed solution"
              required
            />
          </div>

          <div className="form-group">
            <label>Development Stage *</label>
            <select
              name="stage"
              className="form-control"
              value={formData.stage}
              onChange={handleChange}
              required
            >
              <option value="Idea">Idea</option>
              <option value="MVP">MVP</option>
              <option value="Revenue">Revenue</option>
            </select>
          </div>

          <div className="form-group">
            <label>Funding Amount Required ($)</label>
            <input
              type="number"
              name="funding_amount"
              className="form-control"
              value={formData.funding_amount}
              onChange={handleChange}
              placeholder="Enter funding amount"
              min="0"
              step="0.01"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Posting...' : 'Post Idea'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PostIdea;
