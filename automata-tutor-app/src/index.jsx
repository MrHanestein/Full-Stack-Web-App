// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
// Import your router component (or App if that contains your Routes)
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./style.css";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
