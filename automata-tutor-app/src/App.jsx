// src/App.jsx
import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
    return (
        <Container style={{ minHeight: "100vh" }} className="d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                {/* Remove the <Router> here; we already have one in index.jsx */}
                <AuthProvider>
                    <Routes>
                        {/* Wrap these in PrivateRoute or do the layout-route approach */}
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/update-profile"
                            element={
                                <PrivateRoute>
                                    <UpdateProfile />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Routes>
                </AuthProvider>
            </div>
        </Container>
    );
}

export default App;
