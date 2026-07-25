import express from "express";
import Thread from "../models/Thread.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.get("/thread", requireAuth, async (req, res) => {
  try {
    const threads = await Thread.find(
      { userId: req.userId },
      { threadId: 1, title: 1, updatedAt: 1 }
    ).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

router.get("/thread/:threadId", requireAuth, async (req, res) => {
  try {
    const thread = await Thread.findOne({
      threadId: req.params.threadId,
      userId: req.userId
    });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

router.delete("/thread/:threadId", requireAuth, async (req, res) => {
  try {
    const deleted = await Thread.findOneAndDelete({
      threadId: req.params.threadId,
      userId: req.userId
    });
    if (!deleted) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

export default router;