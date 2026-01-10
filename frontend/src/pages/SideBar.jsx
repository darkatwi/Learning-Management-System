import React from "react";
import { LayoutDashboard, BookOpen, Award, Settings, ChevronRight } from "lucide-react";
import "./Dashboard.css";

const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate }) {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`sidebar-btn ${isActive ? "active" : ""}`}
                        >
                            <Icon className="sidebar-icon" />
                            <span className="sidebar-label">{item.label}</span>
                            {isActive && <ChevronRight className="sidebar-chevron" />}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
