import React from "react";
import "../pages/courselist.css";

export function Badge({ children, variant = "default", className = "" }) {
    let variantClass = "";

    switch (variant) {
        case "secondary":
            variantClass = "badge-secondary";
            break;
        case "destructive":
            variantClass = "badge-destructive";
            break;
        case "outline":
            variantClass = "badge-outline";
            break;
        default:
            variantClass = "badge-default";
    }

    return (
        <span className={`badge ${variantClass} ${className}`}>
            {children}
        </span>
    );
}
