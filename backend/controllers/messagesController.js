const db = require('../config/database');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, idea_id, message } = req.body;

    // Validate input
    if (!sender_id || !receiver_id || !idea_id || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await db.query(
      `INSERT INTO messages (sender_id, receiver_id, idea_id, message) 
       VALUES (?, ?, ?, ?)`,
      [sender_id, receiver_id, idea_id, message]
    );

    res.status(201).json({
      message: 'Message sent successfully',
      messageId: result.insertId
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
};

// Get inbox messages
exports.getInbox = async (req, res) => {
  try {
    const { userId } = req.params;

    const [messages] = await db.query(
      `SELECT 
        m.*,
        sender.display_name as sender_name,
        sender.email as sender_email,
        i.title as idea_title,
        i.domain as idea_domain
       FROM messages m
       JOIN users sender ON m.sender_id = sender.id
       JOIN ideas i ON m.idea_id = i.id
       WHERE m.receiver_id = ?
       ORDER BY m.created_at DESC`,
      [userId]
    );

    res.json(messages);
  } catch (error) {
    console.error('Get inbox error:', error);
    res.status(500).json({ error: 'Error fetching inbox messages' });
  }
};

// Get sent messages
exports.getSentMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const [messages] = await db.query(
      `SELECT 
        m.*,
        receiver.display_name as receiver_name,
        receiver.email as receiver_email,
        i.title as idea_title,
        i.domain as idea_domain
       FROM messages m
       JOIN users receiver ON m.receiver_id = receiver.id
       JOIN ideas i ON m.idea_id = i.id
       WHERE m.sender_id = ?
       ORDER BY m.created_at DESC`,
      [userId]
    );

    res.json(messages);
  } catch (error) {
    console.error('Get sent messages error:', error);
    res.status(500).json({ error: 'Error fetching sent messages' });
  }
};

// Get messages by idea
exports.getMessagesByIdea = async (req, res) => {
  try {
    const { ideaId } = req.params;
    const { userId } = req.query;

    const [messages] = await db.query(
      `SELECT 
        m.*,
        sender.display_name as sender_name,
        receiver.display_name as receiver_name,
        i.title as idea_title
       FROM messages m
       JOIN users sender ON m.sender_id = sender.id
       JOIN users receiver ON m.receiver_id = receiver.id
       JOIN ideas i ON m.idea_id = i.id
       WHERE m.idea_id = ? AND (m.sender_id = ? OR m.receiver_id = ?)
       ORDER BY m.created_at ASC`,
      [ideaId, userId, userId]
    );

    res.json(messages);
  } catch (error) {
    console.error('Get messages by idea error:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};
