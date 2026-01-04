import React from "react";
import "../pages/loginpage.css";

function Button({ className = "", children, ...props }) {
    return (
        <button className={`btn ${className}`} {...props}>
            {children}
        </button>
    );
}

export { Button };
