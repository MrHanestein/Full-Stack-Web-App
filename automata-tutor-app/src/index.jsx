// src/index.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter'
import { AuthProvider } from './AuthContext'
import './style.css'          // Our custom CSS
import './index.css'           // If you have Tailwind setup here

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    </React.StrictMode>
)
