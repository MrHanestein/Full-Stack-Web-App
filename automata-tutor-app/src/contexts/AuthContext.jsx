// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase"; // from firebase.js

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // Sign up
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    // Log in
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    // Log out
    function logout() {
        return auth.signOut();
    }

    // Reset password
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    // Update email
    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    // Update password
    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    // Listen for auth state changes once on mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Only render children once we know the user status */}
            {!loading && children}
        </AuthContext.Provider>
    );
}
