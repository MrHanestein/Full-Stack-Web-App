// src/contexts/AuthContext.js
import React, {createContext, useContext, useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail as fbUpdateEmail,
    updatePassword as fbUpdatePassword
} from "firebase/auth";
import {auth} from "../firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading]       = useState(true);

    // Sign up
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Log in
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Log out
    function logout() {
        return signOut(auth);
    }

    // Reset password
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // Update email
    function updateEmail(email) {
        // Note: fbUpdateEmail takes (user, newEmail)
        return fbUpdateEmail(currentUser, email);
    }

    // Update password
    function updatePassword(password) {
        return fbUpdatePassword(currentUser, password);
    }

    // Listen for auth changes on mount
    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
