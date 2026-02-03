const express = require('express');
const router = express.Router();
const ideasController = require('../controllers/ideasController');

// POST /api/ideas - Create new idea
router.post('/', ideasController.createIdea);

// GET /api/ideas - Get all ideas
router.get('/', ideasController.getAllIdeas);

// GET /api/ideas/user/:userId - Get ideas by user
router.get('/user/:userId', ideasController.getIdeasByUser);

// GET /api/ideas/dashboard/:userId - Get dashboard stats
router.get('/dashboard/:userId', ideasController.getDashboardStats);

// GET /api/ideas/:id - Get single idea
router.get('/:id', ideasController.getIdeaById);

// PUT /api/ideas/:id - Update idea
router.put('/:id', ideasController.updateIdea);

// DELETE /api/ideas/:id - Delete idea
router.delete('/:id', ideasController.deleteIdea);

module.exports = router;
