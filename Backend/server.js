import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
// Use Render's dynamic PORT or default to 8080 locally
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// Root route so visiting the URL doesn't show "Cannot GET /"
app.get("/", (req, res) => {
  res.send("The Big Dipper AI Backend is running smoothly!");
});

app.use("/api", chatRoutes);

const connectDB = async () => {
  try {
    // Make sure your Render Env Var is named MONGODB_URI
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with Db", err);
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});