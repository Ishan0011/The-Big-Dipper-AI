# 🎨 The Big Dipper AI — Frontend

This is the client-side user interface for **The Big Dipper AI**, built with **React** and **Vite**. It provides a modern, responsive, ChatGPT-style chat interface with persistent user sessions, real-time messaging updates, and thread management.

**Live Demo:** [the-big-dipper-ai.vercel.app](https://the-big-dipper-ai.vercel.app/)

---

## 🛠️ Tech Stack & Dependencies

* **Framework:** React 18+ (via Vite)
* **Build Tool:** Vite
* **Styling:** CSS3 / Custom Styles (Dark Theme)
* **State Management:** React Context API (`MyContext.jsx`)
* **Linting:** ESLint

---

## 📁 Folder & Component Structure

```text
Frontend/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Images, icons, and local visual assets
│   ├── App.jsx             # Main application container & auth check
│   ├── Auth.jsx            # Login & Signup toggle form
│   ├── Chat.jsx            # Message renderer (user vs. AI bubble formatting)
│   ├── ChatWindow.jsx      # Main conversation area & prompt input box
│   ├── Sidebar.jsx         # Thread history navigation & "New Chat" button
│   ├── MyContext.jsx       # Global state (user token, active thread, chat history)
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global layout & styling definitions
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Scripts & dependencies

---