// src/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import ChapterPage from "./ChapterPage";
import Leaderboard from "./Leaderboard";
import LiveChat from "./LiveChat";
import DFATester from "./DFATester";
import AutomataHome from "./AutomataHome";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import PrivateRoute from "./components/PrivateRoute";
import CustomDFADrawer from "./CustomDFADrawer2";

function AppRouter() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/dfa-tester" element={<DFATester states={[]} transitions={[]} startState={null} />} />
            <Route path="/admin" element={<DFATester states={[]} transitions={[]} startState={null} />} />
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
                        description="Explore the concept of nondeterminism and how NFAs compare to DFAs."
                    />
                }
            />
            <Route
                path="/chapter/1.3"
                element={
                    <ChapterPage
                        title="📙 Chapter 1.3 – Regular Expressions"
                        description="Understand how regular expressions define languages recognized by finite automata."
                    />
                }
            />
            <Route
                path="/chapter/1.4"
                element={
                    <ChapterPage
                        title="📕 Chapter 1.4 – Pumping Lemma"
                        description="Learn to prove non-regularity of languages using the Pumping Lemma."
                    />
                }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/chat" element={<LiveChat />} />
            <Route path="/quiz" element={<AutomataHome />} />


            {/* Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/custom-dfa" element={<CustomDFADrawer />} />

            {/* Protected Routes */}
            <Route
                path="/update-profile"
                element={
                    <PrivateRoute>
                        <UpdateProfile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default AppRouter;
