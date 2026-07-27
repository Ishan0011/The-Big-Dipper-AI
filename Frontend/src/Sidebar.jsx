import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v4 as uuidv4 } from "uuid";

import logoImg from "./assets/blacklogo.png"; 

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function Sidebar() {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats, token, isSidebarOpen, toggleSidebar } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/thread`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            
            if (Array.isArray(res)) {
                const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
                setAllThreads(filteredData);
            }
        } catch(err) {
            console.log("Error fetching threads:", err);
        }
    };

    useEffect(() => {
        if (token) getAllThreads();
    }, [currThreadId, token]);


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv4());
        setPrevChats([]);
    };

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`${API_BASE_URL}/api/thread/${newThreadId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log("Error changing thread:", err);
        }
    };   

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/thread/${threadId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            await response.json();

            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId) {
                createNewChat();
            }

        } catch(err) {
            console.log("Error deleting thread:", err);
        }
    };

    return (
        <section className={`sidebar ${isSidebarOpen ? "" : "sidebarClosed"}`}>
            <div className="sidebarTop">
                <div className="sidebarBrand">
                    <img src={logoImg} alt="gpt logo" className="logo" />
                    <span className="brandName">The Big Dipper AI</span>
                </div>
                <div className="sidebarTopIcons">
                    <span title="New chat" onClick={createNewChat}><i className="fa-solid fa-pen-to-square"></i></span>
                    <span title="Close sidebar" onClick={toggleSidebar}><i className="fa-solid fa-angles-left"></i></span>
                </div>
            </div>

            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} 
                            onClick={() => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted": " "}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
            </ul>
 
            <div className="sign">
                <p>By Ishan & Kushagra </p>
            </div>
        </section>
    );
}

export default Sidebar;