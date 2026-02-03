const db = require('../config/database');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const [users] = await db.query(
      'SELECT id, email, display_name, domain, bio, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { display_name, domain, bio } = req.body;

    await db.query(
      'UPDATE users SET display_name = ?, domain = ?, bio = ? WHERE id = ?',
      [display_name, domain, bio, userId]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

// Get user by ID (for messaging)
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const [users] = await db.query(
      'SELECT id, email, display_name, domain FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};
