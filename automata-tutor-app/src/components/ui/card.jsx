import React from "react";

export function Card({ children, ...props }) {
    return (
        <div
            {...props}
            className={
                "border border-gray-300 rounded shadow bg-white " + (props.className || "")
            }
        >
            {children}
        </div>
    );
}

export function CardContent({ children, ...props }) {
    return (
        <div {...props} className={"p-4 " + (props.className || "")}>
            {children}
        </div>
    );
}
