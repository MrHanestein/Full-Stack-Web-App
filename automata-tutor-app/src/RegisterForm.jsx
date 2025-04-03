// src/RegisterForm.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            return setError("Passwords do not match");
        }
        try {
            await register(email, password);
        } catch (err) {
            setError("Registration failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">📝 Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
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
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Confirm Password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        Register
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
