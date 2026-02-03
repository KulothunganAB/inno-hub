const db = require('../config/database');

// Create new idea
exports.createIdea = async (req, res) => {
  try {
    const { user_id, title, domain, problem, solution, stage, funding_amount } = req.body;

    // Validate input
    if (!user_id || !title || !domain || !problem || !solution || !stage) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await db.query(
      `INSERT INTO ideas (user_id, title, domain, problem, solution, stage, funding_amount) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, title, domain, problem, solution, stage, funding_amount || 0]
    );

    res.status(201).json({
      message: 'Idea created successfully',
      ideaId: result.insertId
    });
  } catch (error) {
    console.error('Create idea error:', error);
    res.status(500).json({ error: 'Error creating idea' });
  }
};

// Get all ideas
exports.getAllIdeas = async (req, res) => {
  try {
    const [ideas] = await db.query(
      `SELECT i.*, u.display_name, u.email 
       FROM ideas i 
       JOIN users u ON i.user_id = u.id 
       ORDER BY i.created_at DESC`
    );

    res.json(ideas);
  } catch (error) {
    console.error('Get all ideas error:', error);
    res.status(500).json({ error: 'Error fetching ideas' });
  }
};

// Get ideas by user
exports.getIdeasByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const [ideas] = await db.query(
      `SELECT i.*, u.display_name, u.email 
       FROM ideas i 
       JOIN users u ON i.user_id = u.id 
       WHERE i.user_id = ? 
       ORDER BY i.created_at DESC`,
      [userId]
    );

    res.json(ideas);
  } catch (error) {
    console.error('Get user ideas error:', error);
    res.status(500).json({ error: 'Error fetching user ideas' });
  }
};

// Get single idea
exports.getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;

    const [ideas] = await db.query(
      `SELECT i.*, u.display_name, u.email 
       FROM ideas i 
       JOIN users u ON i.user_id = u.id 
       WHERE i.id = ?`,
      [id]
    );

    if (ideas.length === 0) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json(ideas[0]);
  } catch (error) {
    console.error('Get idea error:', error);
    res.status(500).json({ error: 'Error fetching idea' });
  }
};

// Update idea
exports.updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, domain, problem, solution, stage, funding_amount, user_id } = req.body;

    // Verify ownership
    const [existingIdea] = await db.query(
      'SELECT user_id FROM ideas WHERE id = ?',
      [id]
    );

    if (existingIdea.length === 0) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (existingIdea[0].user_id !== user_id) {
      return res.status(403).json({ error: 'Not authorized to update this idea' });
    }

    await db.query(
      `UPDATE ideas 
       SET title = ?, domain = ?, problem = ?, solution = ?, stage = ?, funding_amount = ? 
       WHERE id = ?`,
      [title, domain, problem, solution, stage, funding_amount, id]
    );

    res.json({ message: 'Idea updated successfully' });
  } catch (error) {
    console.error('Update idea error:', error);
    res.status(500).json({ error: 'Error updating idea' });
  }
};

// Delete idea
exports.deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    // Verify ownership
    const [existingIdea] = await db.query(
      'SELECT user_id FROM ideas WHERE id = ?',
      [id]
    );

    if (existingIdea.length === 0) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (existingIdea[0].user_id !== user_id) {
      return res.status(403).json({ error: 'Not authorized to delete this idea' });
    }

    await db.query('DELETE FROM ideas WHERE id = ?', [id]);

    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    console.error('Delete idea error:', error);
    res.status(500).json({ error: 'Error deleting idea' });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get total ideas count
    const [ideasCount] = await db.query(
      'SELECT COUNT(*) as count FROM ideas WHERE user_id = ?',
      [userId]
    );

    // Get total messages received
    const [messagesCount] = await db.query(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = ?',
      [userId]
    );

    // Get recent ideas
    const [recentIdeas] = await db.query(
      `SELECT i.*, u.display_name 
       FROM ideas i 
       JOIN users u ON i.user_id = u.id 
       WHERE i.user_id = ? 
       ORDER BY i.created_at DESC 
       LIMIT 5`,
      [userId]
    );

    res.json({
      totalIdeas: ideasCount[0].count,
      totalMessages: messagesCount[0].count,
      recentIdeas
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Error fetching dashboard stats' });
  }
};
