# ⚙️ The Big Dipper AI — Backend API

This is the server-side REST API for **The Big Dipper AI**, built with **Node.js**, **Express**, and **MongoDB**. It handles user authentication, thread management, database persistence, and communicates directly with Groq's Llama 3.3 model for AI response generation.

**Live API Base:** [the-big-dipper-ai-backend.onrender.com](https://the-big-dipper-ai.onrender.com/)

---

## 🛠️ Tech Stack & Services

* **Runtime & Framework:** Node.js + Express
* **Database:** MongoDB Atlas (via Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **AI Provider Integration:** Groq API (`llama-3.3-70b-versatile`)
* **Hosting Platform:** Render

---

## 📁 Folder Structure

```text
Backend/
├── middleware/
│   └── auth.js            # JWT verification middleware (protects routes)
├── models/
│   ├── User.js            # User schema (email, hashed password, user profile)
│   └── Thread.js          # Chat thread schema (messages array, user ref, title)
├── routes/
│   ├── auth.js            # Signup & Login handlers
│   ├── chat.js            # Processes user prompts & fetches Groq AI responses
│   └── thread.js          # CRUD routes for retrieving & deleting chat threads
├── utils/
│   └── openai.js          # Groq API client initialization & helper functions
├── server.js              # Express app entry point & MongoDB connection setup
└── package.json           # Backend dependencies & startup scripts