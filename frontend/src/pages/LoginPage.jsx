import React, { useState } from "react";
import { GraduationCap, BookOpen, Award, Users, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import githubIcon from '../icons/github.jpg';
import googleIcon from '../icons/google.png';
import "./loginpage.css";

export function LoginPage({ onNavigate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const caps = [
        { top: "10%", left: "8%", size: 100, rotate: -15 },
        { top: "40%", left: "25%", size: 110, rotate: 10 },
        { top: "70%", left: "12%", size: 105, rotate: -5 },
        { top: "20%", left: "55%", size: 120, rotate: 25 },
        { top: "65%", left: "40%", size: 100, rotate: -20 },
        { top: "45%", left: "75%", size: 95, rotate: 15 },
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post("http://localhost:5285/api/auth/login", {
                email,
                password
            });

            const token = res.data.token;
            if (!token) throw new Error("No token returned from server");

            localStorage.setItem("token", token);

            onNavigate?.("courses"); 
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password");
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
                                transform: `rotate(${cap.rotate}deg)`
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

                    <h2 className="tagline">
                        Transform Your Future<br />Through Learning
                    </h2>

                    <p className="subtitle">
                        Join thousands of learners<br />mastering real-world skills
                    </p>

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
                <form className="login-form" onSubmit={handleLogin}>
                    <h2 className="align-with-left">Welcome back</h2>
                    <p className="align-with-left">Enter your credentials to access your account</p>

                    {error && <p className="error-message">{error}</p>}

                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="password-row">
                        <Label htmlFor="password">Password</Label>
                        <span
                            className="forgot-password"
                            onClick={() => onNavigate?.("forgot-password")}
                            style={{ cursor: "pointer" }}
                        >
                            Forgot password?
                        </span>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="button signin" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>

                    <div className="or-divider">OR CONTINUE WITH</div>

                    <div className="social-buttons inline">
                        <button type="button" className="social-button google">
                            <img src={googleIcon} alt="Google" className="social-icon" />
                            Google
                        </button>
                        <button type="button" className="social-button github">
                            <img src={githubIcon} alt="GitHub" className="social-icon" />
                            GitHub
                        </button>
                    </div>

                    <div className="signup-text centered">
                        Don’t have an account?{" "}
                        <span
                            className="signup-link"
                            onClick={() => onNavigate?.("register")}
                            style={{ cursor: "pointer" }}
                        >
                            Sign up for free
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
