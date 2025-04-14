// src/LoginForm.jsx
import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";
import {useEffect} from "react";

export default function LoginForm() {
    const { login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setError("Login failed. Check credentials.");
        }
        useEffect(() => {
            if (currentUser) {
                //check code
               navigate("/Homepage");
            }
        }, [currentUser]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">🔐 Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={loginWithGoogle}
                        className="w-full bg-red-500 text-white py-2 rounded"
                    >
                        Login with Google
                    </button>
                </div>

                <p className="mt-4 text-sm text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
