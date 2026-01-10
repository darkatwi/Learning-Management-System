import React, { useState, useEffect } from "react";
import { GraduationCap, BookOpen, Award, Users, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import "./loginpage.css";

export function ResetPasswordPage({ onNavigate }) {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // Prefill email and token from URL query params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const e = params.get("email");
        const t = params.get("token");
        if (e) setEmail(e);
        if (t) setToken(t);
    }, []);

    const caps = [
        { top: "10%", left: "8%", size: 100, rotate: -15 },
        { top: "40%", left: "25%", size: 110, rotate: 10 },
        { top: "70%", left: "12%", size: 105, rotate: -5 },
        { top: "20%", left: "55%", size: 120, rotate: 25 },
        { top: "65%", left: "40%", size: 100, rotate: -20 },
        { top: "45%", left: "75%", size: 95, rotate: 15 },
    ];

    const handleReset = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!token || !email) {
            setError("Email or token is missing from the link.");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:5285/api/auth/reset-password", {
                email,
                token,
                newPassword
            });

            setMessage("Password has been reset successfully! Redirecting to login...");

            setTimeout(() => {
                onNavigate("login");
            }, 2500);

            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error("Reset password failed:", err);
            if (err.response?.data?.errors) {
                setError(JSON.stringify(err.response.data.errors));
            } else {
                setError("Failed to reset password. Check your token and try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="caps-area">
                    {caps.map((cap, i) => (
                        <GraduationCap
                            key={i}
                            className="float-cap"
                            style={{
                                top: cap.top,
                                left: cap.left,
                                width: cap.size,
                                height: cap.size,
                                transform: `rotate(${cap.rotate}deg)`,
                            }}
                        />
                    ))}
                </div>
                <div className="left-content">
                    <div className="brand-wrap">
                        <h1 className="brand-title">
                            <span className="first-letter">
                                <GraduationCap className="brand-cap" />
                                S
                            </span>killUp Academy
                        </h1>
                    </div>
                    <div className="purple-block"></div>
                    <h2 className="tagline">Transform Your Future<br />Through Learning</h2>
                    <p className="subtitle">Reset your password securely</p>

                    <div className="stats-grid">
                        <div className="stats-box small">
                            <Users />
                            <h2>25K+</h2>
                            <p>Active Students</p>
                        </div>
                        <div className="stats-box small">
                            <BookOpen />
                            <h2>500+</h2>
                            <p>Courses</p>
                        </div>
                        <div className="stats-box small">
                            <Award />
                            <h2>10K+</h2>
                            <p>Certificates</p>
                        </div>
                        <div className="stats-box small">
                            <TrendingUp />
                            <h2>95%</h2>
                            <p>Success Rate</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-right">
                <form className="login-form" onSubmit={handleReset}>
                    <h2 className="align-with-left">Reset Password</h2>
                    <p className="align-with-left">Enter your new password to update your account</p>

                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}

                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        readOnly // prevent editing because it's from the link
                    />

                    <Label htmlFor="token">Reset Token</Label>
                    <Input
                        id="token"
                        type="text"
                        placeholder="Reset token from email"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                        readOnly // prevent editing because it's from the link
                    />

                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="button signin" disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>

                    <div className="signup-text centered">
                        Remembered your password?{" "}
                        <span className="signup-link" onClick={() => onNavigate("login")}>
                            Sign in
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
