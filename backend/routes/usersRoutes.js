const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET /api/users/:userId - Get user profile
router.get('/:userId', usersController.getProfile);

// PUT /api/users/:userId - Update user profile
router.put('/:userId', usersController.updateProfile);

// GET /api/users/details/:userId - Get user by ID
router.get('/details/:userId', usersController.getUserById);

module.exports = router;
