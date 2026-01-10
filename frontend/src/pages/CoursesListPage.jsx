import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Clock, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Sidebar from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer"; // <-- Import the footer
import "./courselist.css";

const categories = [
    "All",
    "Web Development",
    "Design",
    "Data Science",
    "Mobile Development",
    "Marketing",
    "Cloud Computing",
];

const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

function CustomDropdown({ label, options, selected, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="custom-dropdown">
            <label>{label}</label>

            <div
                className="dropdown-trigger"
                onClick={() => setOpen(!open)}
            >
                {selected} <span>{open ? "▲" : "▼"}</span>
            </div>

            {open && (
                <ul className="dropdown-options">
                    {options.map((opt) => (
                        <li key={opt} onClick={() => { onChange(opt); setOpen(false); }}>
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function CourseListPage({ onNavigate, onSelectCourse }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Not authenticated");

                const res = await axios.get(
                    "http://localhost:5285/api/Courses",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const mapped = res.data.map((c) => ({
                    ...c,
                    studentsEnrolled: c.enrollments?.length || 0,
                }));

                setCourses(mapped);
            } catch (err) {
                console.error(err);
                setError("Failed to load courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter((course) => {
        const categoryMatch =
            selectedCategory === "All" ||
            course.category === selectedCategory;

        const difficultyMatch =
            selectedDifficulty === "All Levels" ||
            course.difficulty === selectedDifficulty;

        return categoryMatch && difficultyMatch;
    });

    const handleEnroll = (course) => {
        if (onSelectCourse) onSelectCourse(course);
        onNavigate("course-detail");
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard-container">
            <Header onNavigate={onNavigate} isLoggedIn />

            <div className="dashboard-main" style={{ display: "flex" }}>
                <Sidebar currentPage="courses" onNavigate={onNavigate} />

                <div className="course-page" style={{ flex: 1 }}>
                    <header className="course-header">
                        <h1>Browse Courses</h1>
                        <p>Discover your next skill</p>
                    </header>

                    <div className="filters">
                        <CustomDropdown
                            label="Category"
                            options={categories}
                            selected={selectedCategory}
                            onChange={setSelectedCategory}
                        />
                        <CustomDropdown
                            label="Difficulty"
                            options={difficulties}
                            selected={selectedDifficulty}
                            onChange={setSelectedDifficulty}
                        />
                    </div>

                    <div className="results-count">
                        Showing {filteredCourses.length} course
                        {filteredCourses.length !== 1 && "s"}
                    </div>

                    <div className="course-grid">
                        {filteredCourses.map((course) => (
                            <Card key={course.id} className="course-card">
                                <div className="thumbnail-container">
                                    <img
                                        className="course-thumbnail"
                                        src={course.thumbnail || "https://picsum.photos/400/200"}
                                        alt={course.title}
                                    />
                                    <Badge className="category-badge">
                                        {course.category || "N/A"}
                                    </Badge>
                                </div>

                                <CardContent className="card-content">
                                    <div className="course-info">
                                        <h3>{course.title}</h3>
                                        <p>{course.instructor || "Unknown Instructor"}</p>
                                    </div>

                                    <div className="course-stats">
                                        <span className="stat">
                                            <Star size={14} className="star" />
                                            {(course.rating || 0).toFixed(1)}
                                        </span>
                                        <span className="stat">
                                            <Users size={14} />
                                            {course.studentsEnrolled}
                                        </span>
                                        <span className="stat">
                                            <Clock size={14} />
                                            {course.duration || "N/A"}
                                        </span>
                                    </div>

                                    <div className="course-footer">
                                        <span className="badge badge-outline">
                                            {course.difficulty || "All Levels"}
                                        </span>
                                        <span className="price">
                                            {course.price ? `$${course.price}` : "Free"}
                                        </span>
                                    </div>

                                    <Button
                                        className="enroll-btn"
                                        onClick={() => handleEnroll(course)}
                                    >
                                        Enroll Now
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="no-courses">No courses found.</div>
                    )}
                </div>
            </div>

            {/* Add Footer here */}
            <Footer />
        </div>
    );
}
