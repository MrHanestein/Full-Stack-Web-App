import React from "react";

export function Input({ type = "text", placeholder, value, onChange, ...props }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
            className={"px-3 py-2 border rounded " + (props.className || "")}
        />
    );
}
