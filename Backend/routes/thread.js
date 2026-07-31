import express from "express";
import Thread from "../models/Thread.js";

const router = express.Router();


router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}, { threadId: 1, title: 1, updatedAt: 1 })
      .sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// GET /api/thread/:threadId - get all messages for a thread
router.get("/thread/:threadId", async (req, res) => {
  try {
    const thread = await Thread.findOne({ threadId: req.params.threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

// DELETE /api/thread/:threadId - delete a thread
router.delete("/thread/:threadId", async (req, res) => {
  try {
    const deleted = await Thread.findOneAndDelete({ threadId: req.params.threadId });
    if (!deleted) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

export default router;