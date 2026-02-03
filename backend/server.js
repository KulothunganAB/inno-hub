require('dotenv').config();
const app = require('./app');
const db = require('./config/database');

const PORT = process.env.PORT || 5000;

// Test database connection
db.query('SELECT 1')
  .then(() => {
    console.log('✅ Database connected successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 InnoHub API server running on port ${PORT}`);
      console.log(`🔗 http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });
