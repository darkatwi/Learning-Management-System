import React, { useState, useEffect } from "react";
import { Search, GraduationCap, Bell, User, Moon, Sun } from "lucide-react";
import "./Dashboard.css";

export function Header({ onNavigate, isLoggedIn = false }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <header className="header">
            {/* Left logo */}
            <div className="header-left" onClick={() => onNavigate(isLoggedIn ? "dashboard" : "courses")}>
                <div className="logo-cap">
                    {/* Purple background with small white cap */}
                    <div className="cap-icon">
                        <GraduationCap width={16} height={16} color="#fff" />
                    </div>
                    <span className="logo-text">SkillUp Academy</span>
                </div>
            </div>

            {/* Center search */}
            {isLoggedIn && (
                <div className="header-center">
                    <div className="search-wrapper">
                        <Search className="search-icon" />
                        <input type="search" placeholder="Search for courses..." className="search-input" />
                    </div>
                </div>
            )}

            {/* Right buttons */}
            <div className="header-right">
                <button className="theme-btn" onClick={toggleTheme}>
                    {isDark ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
                </button>

                {isLoggedIn ? (
                    <>
                        <button className="icon-btn">
                            <Bell className="icon" />
                            <span className="notification-dot"></span>
                        </button>

                        <div className="user-menu">
                            <button className="user-btn">
                                <div className="user-avatar">
                                    <User className="icon-small" />
                                </div>
                                <span className="user-name">John Doe</span>
                            </button>
                            <div className="user-dropdown">
                                <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
                                <button onClick={() => onNavigate("courses")}>My Courses</button>
                                <button onClick={() => onNavigate("certificates")}>Certificates</button>
                                <button onClick={() => onNavigate("settings")}>Settings</button>
                                <hr />
                                <button onClick={() => onNavigate("login")}>Logout</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="auth-buttons">
                        <button onClick={() => onNavigate("login")}>Login</button>
                        <button onClick={() => onNavigate("login")}>Sign Up</button>
                    </div>
                )}
            </div>
        </header>
    );
}
