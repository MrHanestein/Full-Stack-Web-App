import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function AuthLayout() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Outlet /> {/* Auth pages show here */}
            </div>
        </Container>
    );
}
