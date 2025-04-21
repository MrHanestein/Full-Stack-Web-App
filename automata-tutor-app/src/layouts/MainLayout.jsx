import React from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div style={{ minHeight: "100vh", width: "100%", background: "#f5f5f5" }}>
            <Outlet /> {/* This is where your page content appears */}
        </div>
    );
}
