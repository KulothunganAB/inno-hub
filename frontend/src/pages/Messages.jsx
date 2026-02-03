import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { messagesAPI, ideasAPI, usersAPI } from '../api';

const Messages = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('compose');
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [ideaId, setIdeaId] = useState('');
  const [ideaDetails, setIdeaDetails] = useState(null);
  const [receiverDetails, setReceiverDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    // Check if there are URL parameters for composing a message
    const userParam = searchParams.get('user');
    const ideaParam = searchParams.get('idea');

    if (userParam && ideaParam) {
      setReceiverId(userParam);
      setIdeaId(ideaParam);
      setActiveTab('compose');
      fetchIdeaDetails(ideaParam);
      fetchReceiverDetails(userParam);
    }

    fetchMessages(userId);
  }, [navigate, searchParams]);

  const fetchIdeaDetails = async (id) => {
    try {
      const response = await ideasAPI.getById(id);
      setIdeaDetails(response.data);
    } catch (error) {
      console.error('Error fetching idea details:', error);
    }
  };

  const fetchReceiverDetails = async (id) => {
    try {
      const response = await usersAPI.getUserById(id);
      setReceiverDetails(response.data);
    } catch (error) {
      console.error('Error fetching receiver details:', error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const [inboxResponse, sentResponse] = await Promise.all([
        messagesAPI.getInbox(userId),
        messagesAPI.getSent(userId),
      ]);
      setInbox(inboxResponse.data);
      setSent(sentResponse.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const senderId = localStorage.getItem('userId');

    if (!receiverId || !ideaId || !messageText) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      await messagesAPI.send({
        sender_id: parseInt(senderId),
        receiver_id: parseInt(receiverId),
        idea_id: parseInt(ideaId),
        message: messageText,
      });

      setSuccess('Message sent successfully!');
      setMessageText('');
      fetchMessages(senderId);

      setTimeout(() => {
        setSuccess('');
        setActiveTab('sent');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Messages</h1>
        <p>Communicate with other innovators</p>
      </div>

      <div className="card">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'compose' ? 'active' : ''}`}
            onClick={() => setActiveTab('compose')}
          >
            ✉️ Compose
          </button>
          <button
            className={`tab ${activeTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setActiveTab('inbox')}
          >
            📥 Inbox ({inbox.length})
          </button>
          <button
            className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
            onClick={() => setActiveTab('sent')}
          >
            📤 Sent ({sent.length})
          </button>
        </div>

        {activeTab === 'compose' && (
          <form onSubmit={handleSendMessage}>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {ideaDetails && (
              <div className="message-card" style={{ marginBottom: '20px' }}>
                <h4>Regarding Idea:</h4>
                <p><strong>{ideaDetails.title}</strong></p>
                <p style={{ fontSize: '14px', color: '#666' }}>{ideaDetails.domain}</p>
              </div>
            )}

            {receiverDetails && (
              <div className="message-card" style={{ marginBottom: '20px' }}>
                <h4>Sending to:</h4>
                <p><strong>{receiverDetails.display_name}</strong> ({receiverDetails.email})</p>
              </div>
            )}

            <div className="form-group">
              <label>Receiver User ID</label>
              <input
                type="number"
                className="form-control"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                placeholder="Enter receiver user ID"
                required
              />
            </div>

            <div className="form-group">
              <label>Idea ID</label>
              <input
                type="number"
                className="form-control"
                value={ideaId}
                onChange={(e) => setIdeaId(e.target.value)}
                placeholder="Enter idea ID"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-control"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}

        {activeTab === 'inbox' && (
          <div>
            {inbox.length > 0 ? (
              inbox.map((message) => (
                <div key={message.id} className="message-card">
                  <div className="message-header">
                    <div>
                      <div className="message-from">From: {message.sender_name}</div>
                      <div className="message-idea">
                        Re: {message.idea_title} ({message.idea_domain})
                      </div>
                    </div>
                    <div className="message-date">
                      {new Date(message.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="message-content">{message.message}</div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <h3>No messages in inbox</h3>
                <p>You haven't received any messages yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sent' && (
          <div>
            {sent.length > 0 ? (
              sent.map((message) => (
                <div key={message.id} className="message-card">
                  <div className="message-header">
                    <div>
                      <div className="message-from">To: {message.receiver_name}</div>
                      <div className="message-idea">
                        Re: {message.idea_title} ({message.idea_domain})
                      </div>
                    </div>
                    <div className="message-date">
                      {new Date(message.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="message-content">{message.message}</div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <h3>No sent messages</h3>
                <p>You haven't sent any messages yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Messages;
