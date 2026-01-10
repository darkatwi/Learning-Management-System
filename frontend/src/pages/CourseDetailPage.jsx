import React, { useState } from "react";
import {
    Star,
    Clock,
    Users,
    PlayCircle,
    FileText,
    CheckCircle2,
    Lock,
    ArrowLeft
} from "lucide-react";
import "./coursedetail.css";

// Layout components
import { Header } from "./Header";
import { Footer } from "./Footer";
import Sidebar from "./Sidebar";

export function CourseDetailPage({ course, onNavigate, initialPage = "courses" }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [currentPage, setCurrentPage] = useState(initialPage);

    const lessons = course.lessons || [
        { id: 1, title: "Introduction to the Course", duration: "5:30", type: "video", completed: true, locked: false },
        { id: 2, title: "Setting Up Your Environment", duration: "12:45", type: "video", completed: true, locked: false },
        { id: 3, title: "Core Concepts Overview", duration: "18:20", type: "video", completed: true, locked: false },
        { id: 4, title: "Hands-On Project Setup", duration: "15:10", type: "video", completed: false, locked: false },
        { id: 5, title: "Advanced Techniques", duration: "22:30", type: "video", completed: false, locked: true },
        { id: 6, title: "Module 1 Quiz", duration: "10 questions", type: "quiz", completed: false, locked: true },
    ];

    const completedLessons = lessons.filter(l => l.completed).length;
    const progress = (completedLessons / lessons.length) * 100;

    const handleNavigate = (page) => {
        setCurrentPage(page);
        console.log("Navigate to:", page);
    };

    return (
        <div className="app-container" style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

            {/* Main content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "white" }}>
                {/* Header */}
                <Header onNavigate={handleNavigate} isLoggedIn={true} />

                {/* Page content */}
                <main style={{ flex: 1, padding: "20px", backgroundColor: "white" }}>
                    <div className="course-detail-page">

                        {/* Back Button */}
                        <button className="back-btn" onClick={() => onNavigate("courses")}>
                            <ArrowLeft size={16} /> Back to Courses
                        </button>

                        {/* Hero Box */}
                        <div className="hero-box">
                            <div className="hero-left">
                                <span className="category-badge">{course.category || "N/A"}</span>
                                <h1 className="course-title">{course.title}</h1>
                                <p className="course-desc">{course.description}</p>
                                <div className="course-meta">
                                    <div><Star className="icon-meta" /> {course.rating || 0}</div>
                                    <div><Users className="icon-meta" /> {course.students || 0}</div>
                                    <div><Clock className="icon-meta" /> {course.duration || "N/A"}</div>
                                </div>
                                <div className="instructor-info">
                                    <img src={course.instructorImg} alt="Instructor" />
                                    <div>
                                        <p className="instructor-name">{course.instructor || "Unknown"}</p>
                                        <p className="instructor-title">{course.instructorTitle || ""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hero-right">
                                <img src={course.thumbnail || "https://picsum.photos/400/200"} alt="Course Thumbnail" />
                            </div>
                        </div>

                        {/* Progress Box */}
                        <div className="progress-box">
                            <div className="progress-header">
                                <span>Your Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        {/* Tabs Box */}
                        <div className="tabs-box">
                            <div className="tabs-header">
                                {["overview", "curriculum", "instructor"].map(tab => (
                                    <button
                                        key={tab}
                                        className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <div className="tabs-content">
                                {activeTab === "overview" && (
                                    <>
                                        <div className="section-box">
                                            <h3>What you'll learn</h3>
                                            <div className="learning-points">
                                                {(course.learningPoints || [
                                                    "Build responsive websites from scratch",
                                                    "Master HTML5, CSS3, and JavaScript ES6+",
                                                    "Create modern web apps with React",
                                                    "Understand backend development basics",
                                                    "Deploy applications to production",
                                                    "Work with APIs and databases",
                                                    "Version control with Git and GitHub",
                                                    "Best practices and industry standards",
                                                ]).map((point, idx) => (
                                                    <div key={idx} className="learning-item">
                                                        <CheckCircle2 className="icon-check" /> {point}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="section-box">
                                            <h3>Course Description</h3>
                                            <p>{course.longDescription || "No description available."}</p>
                                        </div>
                                    </>
                                )}

                                {activeTab === "curriculum" && (
                                    <div className="section-box">
                                        <h3>Course Content</h3>
                                        {lessons.map(lesson => {
                                            const Icon = lesson.type === "video" ? PlayCircle : FileText;
                                            return (
                                                <div
                                                    key={lesson.id}
                                                    className={`lesson-item ${lesson.locked ? "locked" : ""}`}
                                                    onClick={() => !lesson.locked && handleNavigate("lesson")}
                                                >
                                                    <div className="lesson-left">
                                                        {lesson.completed ? <CheckCircle2 className="icon-complete" /> :
                                                            lesson.locked ? <Lock className="icon-locked" /> : <Icon className="icon-lesson" />}
                                                        <div>
                                                            <p className={`lesson-title ${lesson.locked ? "locked-text" : ""}`}>{lesson.title}</p>
                                                            <p className="lesson-duration">{lesson.duration}</p>
                                                        </div>
                                                    </div>
                                                    {lesson.locked && <span className="premium-badge">Premium</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {activeTab === "instructor" && (
                                    <div className="section-box instructor-card">
                                        <img src={course.instructorImg} alt="Instructor" className="instructor-img-large" />
                                        <div>
                                            <h3>{course.instructor || "Unknown"}</h3>
                                            <p>{course.instructorTitle || ""}</p>
                                            <div className="instructor-stats">
                                                <div>{course.rating || 0} <span>Rating</span></div>
                                                <div>{course.students || 0} <span>Students</span></div>
                                                <div>{course.totalCourses || 1} <span>Courses</span></div>
                                            </div>
                                            <p>{course.instructorBio || "No bio available."}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
