import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Auth from "./Auth.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === null ? true : stored === "true";
  });
  const [isGuest, setIsGuest] = useState(false);
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const setTheme = (nextTheme) => {
    localStorage.setItem("theme", nextTheme);
    setThemeState(nextTheme);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => {
      localStorage.setItem("sidebarOpen", String(!prev));
      return !prev;
    });
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setPrompt("");
    setReply(null);
    setAllThreads([]);
    setPrevChats([]);
    setCurrThreadId(uuidv1());
    setNewChat(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsGuest(false);
    setAllThreads([]);
    setPrevChats([]);
    setCurrThreadId(uuidv1());
    setNewChat(true);
  };

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    token, setToken,
    user, setUser,
    isSidebarOpen, toggleSidebar,
    isGuest, continueAsGuest,
    theme, setTheme,
    logout
  };

  return (
    <div className='app' data-theme={theme}>
      <MyContext.Provider value={providerValues}>
        {(token || isGuest) ? (
          <>
            <Sidebar></Sidebar>
            <ChatWindow></ChatWindow>
          </>
        ) : (
          <Auth></Auth>
        )}
      </MyContext.Provider>
    </div>
  )
}

export default App