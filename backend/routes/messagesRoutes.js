const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

// POST /api/messages - Send a message
router.post('/', messagesController.sendMessage);

// GET /api/messages/inbox/:userId - Get inbox messages
router.get('/inbox/:userId', messagesController.getInbox);

// GET /api/messages/sent/:userId - Get sent messages
router.get('/sent/:userId', messagesController.getSentMessages);

// GET /api/messages/idea/:ideaId - Get messages by idea
router.get('/idea/:ideaId', messagesController.getMessagesByIdea);

module.exports = router;
