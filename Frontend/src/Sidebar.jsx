import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v4 as uuidv4 } from "uuid";

import logoImg from "./assets/blacklogo.png"; 

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function Sidebar() {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/thread`);
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
        getAllThreads();
    }, [currThreadId]);


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
            const response = await fetch(`${API_BASE_URL}/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log("Error changing thread:", err);
        }
    };   

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/thread/${threadId}`, { method: "DELETE" });
            const res = await response.json();
            console.log(res);

            // Updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId) {
                createNewChat();
            }

        } catch(err) {
            console.log("Error deleting thread:", err);
        }
    };

    return (
        <section className="sidebar">
            <button onClick={createNewChat}>
                <img src={logoImg} alt="gpt logo" className="logo" />
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>


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
                <p>By Ishan </p>
            </div>
        </section>
    );
}

export default Sidebar;