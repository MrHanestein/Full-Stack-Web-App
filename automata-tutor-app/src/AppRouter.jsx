// src/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Import your pages
import HomePage from "./HomePage";
import ChapterPage from "./ChapterPage";
import Leaderboard from "./Leaderboard";
import LiveChat from "./LiveChat";
import DFATester from "./DFATester";
import AutomataHome from "./AutomataHome";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AppRouter() {
    const { currentUser } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

                {/* Chapter routes */}
                <Route
                    path="/chapter/1.1"
                    element={
                        <ChapterPage
                            title="📘 Chapter 1.1 – DFA"
                            description="Learn the foundations of deterministic finite automata and how they work."
                        />
                    }
                />
                <Route
                    path="/chapter/1.2"
                    element={
                        <ChapterPage
                            title="📗 Chapter 1.2 – NFA"
                            description="Explore nondeterminism and how NFAs compare to DFAs."
                        />
                    }
                />
                <Route
                    path="/chapter/1.3"
                    element={
                        <ChapterPage
                            title="📙 Chapter 1.3 – Regular Expressions"
                            description="Understand how regex define languages recognized by finite automata."
                        />
                    }
                />
                <Route
                    path="/chapter/1.4"
                    element={
                        <ChapterPage
                            title="📕 Chapter 1.4 – Pumping Lemma"
                            description="Use the lemma to show non-regularity of certain languages."
                        />
                    }
                />

                {/* Quizzes */}
                <Route path="/quiz" element={<AutomataHome />} />

                {/* DFA Tester */}
                <Route
                    path="/dfa-tester"
                    element={<DFATester states={[]} transitions={[]} startState={null} />}
                />

                {/* Admin also uses the same DFATester but can see extra info if email===admin */}
                <Route
                    path="/admin"
                    element={<DFATester states={[]} transitions={[]} startState={null} />}
                />

                {/* Leaderboard & Chat */}
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/chat" element={<LiveChat />} />

                {/* Auth */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </Router>
    );
}
