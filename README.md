# ✨ The Big Dipper AI

A full-stack AI chat application — a ChatGPT-style clone built from scratch with the MERN stack, powered by Groq's Llama 3.3 model, with secure user accounts and persistent, per-user chat history.

**Live app:** [the-big-dipper-ai.vercel.app](https://the-big-dipper-ai.vercel.app/)

---

## 📌 Overview

The Big Dipper AI lets users sign up, log in, and have AI-powered conversations that are saved to their account. Every user has their own private chat history — nobody can see anyone else's conversations. Under the hood, it's a classic three-tier web app: a React frontend, an Express/Node backend, and a MongoDB database, with an external LLM provider (Groq) generating the actual chat replies.

```
┌─────────────┐        HTTPS        ┌──────────────┐        ┌──────────────┐
│   React     │  ───────────────▶   │   Express    │  ────▶ │   MongoDB    │
│  (Vercel)   │  ◀───────────────   │   (Render)   │  ◀──── │   (Atlas)    │
└─────────────┘                     └──────┬───────┘        └──────────────┘
                                            │
                                            ▼
                                     ┌──────────────┐
                                     │  Groq API    │
                                     │ (Llama 3.3)  │
                                     └──────────────┘
```

---

## 🚀 Features

- **User accounts** — sign up and log in with email and password
- **Secure authentication** — passwords hashed with bcrypt, sessions handled with JWT tokens
- **AI-powered chat** — conversations answered by Groq's `llama-3.3-70b-versatile` model
- **Persistent chat history** — every conversation is saved to MongoDB and reloads automatically
- **Private per-user data** — each user only ever sees their own chat threads
- **Multiple conversations** — start new chats, switch between past ones, or delete them
- **Responsive dark-themed UI** — built with React, styled to feel like a modern chat app

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite) |
| **Frontend hosting** | Vercel |
| **Backend** | Node.js + Express |
| **Backend hosting** | Render |
| **Database** | MongoDB + Mongoose |
| **Database hosting** | MongoDB Atlas |
| **AI provider** | Groq (Llama 3.3 70B) |
| **Auth** | JWT (jsonwebtoken) + bcryptjs |

This is a **MERN stack** application (MongoDB, Express, React, Node) with Groq's LLM API layered on top for chat intelligence.

---

## 📁 Project Structure

```
The-Big-Dipper-AI/
├── Backend/
│   ├── server.js              # App entry point — starts Express, connects MongoDB
│   ├── middleware/
│   │   └── auth.js            # Verifies JWT tokens, protects routes
│   ├── models/
│   │   ├── User.js            # User schema (name, email, hashed password)
│   │   └── Thread.js          # Chat thread schema (messages, owner, title)
│   ├── routes/
│   │   ├── auth.js            # /api/auth/signup, /api/auth/login
│   │   ├── chat.js            # /api/chat — sends message to AI, saves reply
│   │   └── thread.js          # /api/thread — list, load, delete chat history
│   └── utils/
│       └── openai.js          # Calls the Groq API to generate AI replies
│
└── Frontend/
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Root component, holds shared state, auth gate
        ├── Auth.jsx           # Login / signup form
        ├── Sidebar.jsx        # Chat history list, new chat, delete chat
        ├── ChatWindow.jsx     # Main chat interface, message input
        ├── Chat.jsx           # Renders message bubbles
        └── MyContext.jsx      # Shared React Context for app-wide state
```

---

## 🔄 How a Message Flows Through the App

1. User types a message and hits send in the browser.
2. The frontend sends a `POST` request to `/api/chat` with the message, a `threadId`, and the user's JWT token in the `Authorization` header.
3. The backend's `requireAuth` middleware verifies the token before anything else runs.
4. The message is forwarded to **Groq's API**, which generates a reply using Llama 3.3.
5. Both the user's message and the AI's reply are saved to the matching `Thread` document in MongoDB, tied to the user's ID.
6. The reply is sent back to the frontend and rendered on screen.

---

## 🔐 Authentication

- **Signup**: password is hashed with `bcrypt` before being stored — plaintext passwords are never saved.
- **Login**: credentials are checked against the hashed password; on success, a **JWT token** is issued.
- **Sessions**: the token is stored in the browser's `localStorage`, so refreshing the page keeps the user logged in.
- **Protected routes**: `/api/chat` and `/api/thread/*` require a valid token — the backend attaches the decoded `userId` to each request and uses it to filter database queries, so users can only ever access their own data.

---

## ⚙️ Environment Variables

The backend requires a `.env` file (not committed to Git) with the following:

```
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=any_long_random_secret_string
PORT=8080
```

The frontend requires one build-time environment variable (set in Vercel's project settings):

```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 💻 Running Locally

### Backend
```bash
cd Backend
npm install
npm run dev
```
Runs on `http://localhost:8080` by default.

### Frontend
```bash
cd Frontend
npm install
npm run dev
```
Runs on `http://localhost:5173` by default (Vite's default port).

Make sure the backend is running first, and that your `.env` file is set up, before starting the frontend.

---

## ☁️ Deployment

- **Backend** is deployed on [Render](https://render.com) as a persistent Node service.
- **Frontend** is deployed on [Vercel](https://vercel.com) as a static Vite build.
- Environment variables must be configured separately in each platform's dashboard — they are never read from a committed `.env` file in production.
- Since `VITE_API_URL` is baked in at build time, changing it requires a fresh Vercel deployment to take effect.

---

## 🧠 About the AI

Replies are generated by **Groq**, running Meta's **Llama 3.3 70B** model. Groq doesn't train the model — they host it on custom hardware built for very fast inference. Like all LLMs, it:

- Has no real-time internet access or knowledge of current events
- Can occasionally produce incorrect or fabricated information
- Currently answers each message independently (conversation context from earlier messages in the thread is not yet sent back to the model — a good next feature to add!)

---

## 🙌 Credits

Built by [Ishan](https://github.com/Ishan0011) and [Kushagra](https://github.com/KushagraSri87).
