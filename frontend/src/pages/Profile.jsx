import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { usersAPI } from '../api';

const Profile = () => {
  const [profile, setProfile] = useState({
    email: '',
    display_name: '',
    domain: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    fetchProfile(userId);
  }, [navigate]);

  const fetchProfile = async (userId) => {
    try {
      const response = await usersAPI.getProfile(userId);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userId = localStorage.getItem('userId');

    try {
      await usersAPI.updateProfile(userId, {
        display_name: profile.display_name,
        domain: profile.domain,
        bio: profile.bio,
      });

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading profile...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div className="card">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={profile.email}
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
              <small style={{ color: '#7f8c8d' }}>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                name="display_name"
                className="form-control"
                value={profile.display_name || ''}
                onChange={handleChange}
                placeholder="Enter your display name"
              />
            </div>

            <div className="form-group">
              <label>Domain / Expertise</label>
              <input
                type="text"
                name="domain"
                className="form-control"
                value={profile.domain || ''}
                onChange={handleChange}
                placeholder="e.g., Full Stack Developer, AI/ML Engineer"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                className="form-control"
                value={profile.bio || ''}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="5"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile(localStorage.getItem('userId'));
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="form-group">
              <label>Email</label>
              <p style={{ fontSize: '16px', color: '#2c3e50' }}>{profile.email}</p>
            </div>

            <div className="form-group">
              <label>Display Name</label>
              <p style={{ fontSize: '16px', color: '#2c3e50' }}>
                {profile.display_name || 'Not set'}
              </p>
            </div>

            <div className="form-group">
              <label>Domain / Expertise</label>
              <p style={{ fontSize: '16px', color: '#2c3e50' }}>
                {profile.domain || 'Not set'}
              </p>
            </div>

            <div className="form-group">
              <label>Bio</label>
              <p style={{ fontSize: '16px', color: '#2c3e50', lineHeight: '1.6' }}>
                {profile.bio || 'No bio added yet'}
              </p>
            </div>

            <div className="form-group">
              <label>Member Since</label>
              <p style={{ fontSize: '16px', color: '#2c3e50' }}>
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>

            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
              ✏️ Edit Profile
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
