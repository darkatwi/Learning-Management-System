import React from "react";

function Input({ className, ...props }) {
    return <input className={`input ${className || ""}`} {...props} />;
}

export { Input };
