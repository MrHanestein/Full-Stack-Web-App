// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { futuristicTheme } from "./HomePage";

import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./HomePage";
import ChapterPage from "./ChapterPage";
import DFATester from "./DFATester";
import Leaderboard from "./Leaderboard";
import LiveChat from "./LiveChat";
import AutomataHome from "./AutomataHome";
import CustomDFADrawer from "./CustomDFADrawer2";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import "bootstrap/dist/css/bootstrap-grid.min.css";

export default function App() {
    return (
        <ThemeProvider theme={futuristicTheme}>
            <AuthProvider>
                <Routes>
                    {/* Public Pages (MainLayout) */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route
                            path="/chapter/1.1"
                            element={<ChapterPage title="📘 Chapter 1.1 – DFA" description="Learn the foundations of deterministic finite automata and how they work." />}
                        />
                        <Route
                            path="/chapter/1.2"
                            element={<ChapterPage title="📗 Chapter 1.2 – NFA" description="Explore the concept of nondeterminism and how NFAs compare to DFAs." />}
                        />
                        <Route
                            path="/chapter/1.3"
                            element={<ChapterPage title="📙 Chapter 1.3 – Regular Expressions" description="Understand how regular expressions define languages recognized by finite automata." />}
                        />
                        <Route
                            path="/chapter/1.4"
                            element={<ChapterPage title="📕 Chapter 1.4 – Pumping Lemma" description="Learn to prove non-regularity of languages using the Pumping Lemma." />}
                        />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/chat" element={<LiveChat />} />
                        <Route path="/quiz" element={<AutomataHome />} />
                        <Route path="/custom-dfa" element={<CustomDFADrawer />} />
                        <Route path="/dfa-tester" element={<DFATester states={[]} transitions={[]} startState={null} />} />
                        <Route path="/admin" element={<DFATester states={[]} transitions={[]} startState={null} />} />
                    </Route>

                    {/* Auth Pages (AuthLayout) */}
                    <Route element={<AuthLayout />}>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Route>

                    {/* Private Pages (Protected + AuthLayout) */}
                    <Route
                        element={
                            <PrivateRoute>
                                <AuthLayout />
                            </PrivateRoute>
                        }
                    >
                        {/* <Route path="/" element={<Dashboard />} /> */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/update-profile" element={<UpdateProfile />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}
