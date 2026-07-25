import "./Auth.css";
import { useState, useContext } from "react";
import { MyContext } from "./MyContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function Auth() {
    const { setToken, setUser } = useContext(MyContext);
    const [mode, setMode] = useState("login"); // "login" | "signup"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
        const body = mode === "login"
            ? { email, password }
            : { name, email, password };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const res = await response.json();

            if (!response.ok) {
                setError(res.error || "Something went wrong");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            setToken(res.token);
            setUser(res.user);
        } catch (err) {
            setError("Could not reach the server. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="authWrapper">
            <form className="authBox" onSubmit={handleSubmit}>
                <h2>{mode === "login" ? "Log in" : "Create your account"}</h2>

                {mode === "signup" && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />

                {error && <p className="authError">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Please wait..." : (mode === "login" ? "Log in" : "Sign up")}
                </button>

                <p className="authSwitch">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
                        {mode === "login" ? "Sign up" : "Log in"}
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Auth;