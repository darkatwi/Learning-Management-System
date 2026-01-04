import React from "react";
import "../pages/coursedetail.css";

export function Tabs({ children, className }) {
    return <div className={`tabs ${className || ""}`}>{children}</div>;
}

export function TabsList({ children, className }) {
    return <div className={`tabs-list ${className || ""}`}>{children}</div>;
}

export function TabsTrigger({ children, className, onClick }) {
    return (
        <button
            className={`tabs-trigger ${className || ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function TabsContent({ children, className }) {
    return <div className={`tabs-content ${className || ""}`}>{children}</div>;
}
