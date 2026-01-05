import React, { useState } from "react";
import { GraduationCap, BookOpen, Award, Users, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import "./loginpage.css";

export function RegisterPage({ onNavigate }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const caps = [
        { top: "10%", left: "8%", size: 100, rotate: -15 },
        { top: "40%", left: "25%", size: 110, rotate: 10 },
        { top: "70%", left: "12%", size: 105, rotate: -5 },
        { top: "20%", left: "55%", size: 120, rotate: 25 },
        { top: "65%", left: "40%", size: 100, rotate: -20 },
        { top: "45%", left: "75%", size: 95, rotate: 15 },
    ];

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:5285/api/auth/register", {
                fullName,
                email,
                password,
                role: "Student" // default role for frontend registration
            });

            setSuccess("Registration successful! You can now log in.");
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error("Registration failed:", err.response || err);
            setError("Registration failed. Email may already be taken or fields are missing.");
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
                    <p className="subtitle">Join thousands of learners<br />mastering real-world skills</p>

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
                <form className="login-form" onSubmit={handleRegister}>
                    <h2 className="align-with-left">Create Account</h2>
                    <p className="align-with-left">Sign up to start learning</p>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? "Registering..." : "Sign Up"}
                    </Button>

                    <div className="signup-text centered">
                        Already have an account?{" "}
                        <span className="signup-link" onClick={() => onNavigate("login")}>
                            Sign in
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
