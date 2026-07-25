import express from 'express';
import { getAIResponse } from '../utils/openai.js';
import Thread from '../models/Thread.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/chat', requireAuth, async (req, res) => {
  try {
    const { message, threadId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (!threadId) {
      return res.status(400).json({ error: 'threadId is required' });
    }

    const aiMessage = await getAIResponse(message);

    let thread = await Thread.findOne({ threadId, userId: req.userId });
    if (!thread) {
      thread = new Thread({
        threadId,
        userId: req.userId,
        title: message.length > 30 ? message.slice(0, 30) + '...' : message,
        messages: []
      });
    }

    thread.messages.push({ role: 'user', content: message });
    thread.messages.push({ role: 'assistant', content: aiMessage });
    thread.updatedAt = new Date();

    await thread.save();

    res.json({ reply: aiMessage });
  } catch (error) {
    console.error('Error in /chat route:', error);
    res.status(500).json({ error: 'Failed to process AI response' });
  }
});

export default router;