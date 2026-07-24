import express from 'express';
import { getAIResponse } from '../utils/openai.js'; // Adjust path if renamed

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const aiMessage = await getAIResponse(message);
    res.json({ reply: aiMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process AI response' });
  }
});

export default router;