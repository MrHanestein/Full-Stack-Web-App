// src/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function HomePage() {
    const { currentUser } = useAuth();

    return (
        <div className="min-h-screen p-8 bg-gradient-to-tr from-blue-100 to-purple-100">
            <h1 className="text-4xl font-bold mb-4 text-center">🚀 Automata Tutor</h1>
            <p className="text-center text-lg text-gray-700 mb-6">
                Master finite automata with fun tools, quizzes, and interactive DFA builders!
            </p>

            {/* Main links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <Link to="/chapter/1.1" className="block p-4 bg-white rounded-xl shadow hover:bg-blue-50">
                    📘 Chapter 1.1 – Deterministic Finite Automata
                </Link>
                <Link to="/chapter/1.2" className="block p-4 bg-white rounded-xl shadow hover:bg-blue-50">
                    📗 Chapter 1.2 – Nondeterministic Finite Automata
                </Link>
                <Link to="/chapter/1.3" className="block p-4 bg-white rounded-xl shadow hover:bg-blue-50">
                    📙 Chapter 1.3 – Regular Expressions
                </Link>
                <Link to="/chapter/1.4" className="block p-4 bg-white rounded-xl shadow hover:bg-blue-50">
                    📕 Chapter 1.4 – Pumping Lemma
                </Link>
                <Link to="/dfa-tester" className="block p-4 bg-white rounded-xl shadow hover:bg-green-50">
                    🧪 DFA Tester (All Chapters)
                </Link>
                <Link to="/leaderboard" className="block p-4 bg-white rounded-xl shadow hover:bg-amber-100">
                    🏆 View Leaderboard
                </Link>
                <Link to="/chat" className="block p-4 bg-white rounded-xl shadow hover:bg-sky-100">
                    💬 Live Student Chat
                </Link>
                {currentUser?.email === "admin@example.com" && (
                    <Link to="/admin" className="block p-4 bg-white rounded-xl shadow hover:bg-red-50">
                        👑 Admin Dashboard
                    </Link>
                )}
                <a
                    href="https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqZMg1VX5gU6dKVal9YgDn"
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 bg-white rounded-xl shadow hover:bg-yellow-100"
                >
                    🎥 Watch Automata Tutorials (YouTube)
                </a>
                <a
                    href="https://www.amazon.com/Introduction-The-Theory-Computation-3rd/dp/113318779X"
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 bg-white rounded-xl shadow hover:bg-yellow-100"
                >
                    📚 Read Sipser's Automata Textbook
                </a>
            </div>

            {/* Extra direct links for Quizzes or Login */}
            <div className="mt-6 text-center">
                <Link
                    to="/quiz"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-3"
                >
                    Go to Quizzes
                </Link>
                {!currentUser && (
                    <Link
                        to="/login"
                        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Login
                    </Link>
                )}
            </div>

            <div className="mt-10 text-center">
                <p className="text-md">
                    ⏳ Try to complete each chapter in under <span className="font-semibold text-blue-700">20 minutes</span> to earn bonus XP!
                </p>
                <p className="text-md mt-1">
                    🏅 Badges, leaderboards, XP tracker, and avatars are now live!
                </p>
            </div>
        </div>
    );
}
