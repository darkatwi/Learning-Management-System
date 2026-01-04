import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Clock, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

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

    const handleSelect = (value) => {
        onChange(value);
        setOpen(false);
    };

    return (
        <div className="custom-dropdown">
            <label>{label}</label>
            <div className="dropdown-trigger" onClick={() => setOpen(!open)}>
                {selected} <span className="arrow">{open ? "▲" : "▼"}</span>
            </div>
            {open && (
                <ul className="dropdown-options">
                    {options.map((opt) => (
                        <li key={opt} onClick={() => handleSelect(opt)}>
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
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("You must login first!");

                const res = await axios.get("http://localhost:5285/api/Courses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                const mappedCourses = Array.isArray(res.data)
                    ? res.data.map((c) => ({
                        ...c,
                        studentsEnrolled: c.enrollments ? c.enrollments.length : 0,
                    }))
                    : [];

                setCourses(mappedCourses);
                console.log("API response:", mappedCourses);
            } catch (err) {
                console.error("Failed to load courses:", err);
                setError("Failed to load courses. Check backend & token.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);


    const filteredCourses = Array.isArray(courses)
        ? courses.filter((course) => {
            const categoryMatch =
                selectedCategory === "All" || course.category === selectedCategory;
            const difficultyMatch =
                selectedDifficulty === "All Levels" ||
                course.difficulty === selectedDifficulty;
            return categoryMatch && difficultyMatch;
        })
        : [];

    const handleEnroll = async (course) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("You must login first!");

            await axios.post(
                `http://localhost:5285/api/Enrollments`,
                { courseId: course.id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert(`Enrolled in ${course.title}!`);


            setCourses((prev) =>
                prev.map((c) =>
                    c.id === course.id
                        ? { ...c, studentsEnrolled: (c.studentsEnrolled || 0) + 1 }
                        : c
                )
            );

            if (onSelectCourse) onSelectCourse(course);
            onNavigate("course-detail");
        } catch (err) {
            console.error("Enrollment failed:", err);
            alert("Failed to enroll. Try again.");
        }
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="course-page">
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
                                src={course.thumbnail || "https://picsum.photos/400/200"}
                                alt={course.title}
                                className="course-thumbnail"
                            />
                            <Badge className="category-badge">{course.category || "N/A"}</Badge>
                        </div>

                        <CardContent className="card-content">
                            <div className="course-info">
                                <h3>{course.title || "Untitled"}</h3>
                                <p>{course.instructor || "Unknown Instructor"}</p>
                            </div>

                            <div className="course-stats">
                                <div className="stat">
                                    <Star className="icon star" />
                                    <span>{(course.rating || 0).toFixed(1)}</span>
                                </div>
                                <div className="stat">
                                    <Users className="icon" />
                                    <span>{course.studentsEnrolled || 0}</span>
                                </div>
                                <div className="stat">
                                    <Clock className="icon" />
                                    <span>{course.duration || "N/A"}</span>
                                </div>
                            </div>

                            <div className="course-footer">
                                <Badge variant="outline">{course.difficulty || "N/A"}</Badge>
                                <span className="price">
                                    {course.price > 0 ? `$${course.price}` : "Free"}
                                </span>
                            </div>

                            <Button className="enroll-btn" onClick={() => handleEnroll(course)}>
                                Enroll Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredCourses.length === 0 && <div className="no-courses">No courses found.</div>}
        </div>
    );
}
