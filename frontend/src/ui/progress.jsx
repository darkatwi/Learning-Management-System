import React from "react";
import "../pages/coursedetail.css";

export function Progress({ value = 0, className, ...props }) {
    return (
        <div className={`progress-container ${className || ""}`} {...props}>
            <div
                className="progress-indicator"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}
