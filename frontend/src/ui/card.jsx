import React from "react";

function Card({ className, children, ...props }) {
    return (
        <div className={`card ${className || ""}`} {...props}>
            {children}
        </div>
    );
}

function CardHeader({ className, children }) {
    return <div className={`card-header ${className || ""}`}>{children}</div>;
}

function CardTitle({ className, children }) {
    return <h2 className={`card-title ${className || ""}`}>{children}</h2>;
}

function CardDescription({ className, children }) {
    return <p className={`card-description ${className || ""}`}>{children}</p>;
}

function CardContent({ className, children }) {
    return <div className={`${className || ""}`}>{children}</div>;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
