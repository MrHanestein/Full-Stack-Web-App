import React from "react";

export function Button({ children, onClick, variant = "default", ...props }) {
    let className = "px-4 py-2 rounded font-medium ";
    if (variant === "outline") {
        className += "border border-gray-400 bg-transparent hover:bg-gray-100";
    } else {
        className += "bg-blue-600 text-white hover:bg-blue-700";
    }
    return (
        <button onClick={onClick} className={className} {...props}>
            {children}
        </button>
    );
}
