import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function ChatWindow() {
    const { prompt, setPrompt, currThreadId, prevChats, setPrevChats, setNewChat, token, user, logout } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        if (!prompt.trim()) return; 

        // 1. Capture prompt and clear input immediately for snappy UX
        const userMessage = prompt;
        setPrompt(""); 
        setLoading(true);
        setNewChat(false);

        // 2. Optimistically add the user's message to the chat window
        setPrevChats(prev => [...prev, { role: "user", content: userMessage }]);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                message: userMessage,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, options);
            const res = await response.json();
            
            // 3. Add the AI's response to the chat window once it arrives
            if (res.reply) {
                setPrevChats(prev => [...prev, { role: "assistant", content: res.reply }]);
            }
        } catch(err) {
            console.error("Error fetching chat:", err);
        } finally {
            setLoading(false);
        }
    }

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    // Array of tailored suggestions placed correctly OUTSIDE the return statement
    const suggestionPrompts = [
        { text: "Structure a MongoDB database for a local household work hiring platform", icon: "fa-solid fa-database" },
        { text: "Explain the time complexity of array manipulation algorithms", icon: "fa-solid fa-code" },
        { text: "Best OBS settings for streaming PS5 gameplay to YouTube", icon: "fa-solid fa-gamepad" },
        { text: "How to connect a React frontend to an Express backend", icon: "fa-solid fa-server" }
    ];

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>The Big Dipper AI<i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            
            {isOpen && 
                <div className="dropDown">
                    {user && <div className="dropDownItem">{user.name} ({user.email})</div>}
                    <div className="dropDownItem"><i className="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }

            {/* --- NEW WELCOME SCREEN --- */}
            {prevChats.length === 0 && !loading && (
                <div className="welcomeScreen">
                    <h1 className="greeting">
                        <span className="gradientText">Hello, {user ? user.name.split(' ')[0] : 'Explorer'}</span>
                    </h1>
                    <p className="subGreeting">How can I assist you today?</p>
                    
                    <div className="suggestionGrid">
                        {suggestionPrompts.map((item, index) => (
                            <div 
                                key={index} 
                                className="suggestionCard" 
                                onClick={() => setPrompt(item.text)}
                            >
                                <i className={item.icon}></i>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Chat></Chat>

            <ScaleLoader color="#fff" loading={loading} />
            
            <div className="chatInput">
                <div className="inputBox">
                    <input 
                        placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    />
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    The Big Dipper AI can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;