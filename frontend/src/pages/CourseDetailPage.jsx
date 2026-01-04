import React, { useState } from "react";
import { Star, Clock, Users, PlayCircle, FileText, CheckCircle2, Lock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import "./coursedetail.css";

export function CourseDetailPage({ course, onNavigate }) {
    const [activeTab, setActiveTab] = useState("overview");

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

    return (
        <div className="course-detail-page">

            <div className="course-hero">
                <div className="hero-left">
                    <Badge className="category-badge">{course.category}</Badge>
                    <h1 className="course-title">{course.title}</h1>
                    <p className="course-desc">{course.description}</p>

                    <div className="course-meta">
                        <div className="meta-item">
                            <Star className="icon-star" />
                            <span>{course.rating}</span>
                            <span>({course.ratingsCount} ratings)</span>
                        </div>
                        <div className="meta-item">
                            <Users className="icon" />
                            <span>{course.students}</span>
                        </div>
                        <div className="meta-item">
                            <Clock className="icon" />
                            <span>{course.duration}</span>
                        </div>
                    </div>

                    <div className="instructor-info">
                        <img
                            src={course.instructorImg}
                            alt="Instructor"
                            className="instructor-img"
                        />
                        <div>
                            <p className="instructor-name">Created by {course.instructor}</p>
                            <p className="instructor-title">{course.instructorTitle}</p>
                        </div>
                    </div>
                </div>

                <div className="hero-right">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="course-img"
                    />
                </div>
            </div>

            <Card className="progress-card">
                <CardContent>
                    <div className="progress-header">
                        <h3>Your Progress</h3>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="progress-bar" />
                    <p>{completedLessons} of {lessons.length} lessons completed</p>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs className="course-tabs">
                <TabsList className="tabs-list">
                    <TabsTrigger
                        className={activeTab === "overview" ? "active" : ""}
                        onClick={() => setActiveTab("overview")}
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        className={activeTab === "curriculum" ? "active" : ""}
                        onClick={() => setActiveTab("curriculum")}
                    >
                        Curriculum
                    </TabsTrigger>
                    <TabsTrigger
                        className={activeTab === "instructor" ? "active" : ""}
                        onClick={() => setActiveTab("instructor")}
                    >
                        Instructor
                    </TabsTrigger>
                </TabsList>

                <TabsContent className="tabs-content" value="overview">
                    <Card>
                        <CardContent>
                            <h3>What you'll learn</h3>
                            <ul className="learning-points">
                                {course.learningPoints.map((item, index) => (
                                    <li key={index}>
                                        <CheckCircle2 className="icon-check" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3>Course Description</h3>
                            <p>{course.longDescription}</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent className="tabs-content" value="curriculum">
                    <Card>
                        <CardContent>
                            <h3>Course Content</h3>
                            <div className="lesson-list">
                                {lessons.map((lesson) => {
                                    const Icon = lesson.type === "video" ? PlayCircle : FileText;
                                    return (
                                        <div
                                            key={lesson.id}
                                            className={`lesson-item ${lesson.locked ? "locked" : ""}`}
                                            onClick={() => !lesson.locked && onNavigate("lesson")}
                                        >
                                            <div className="lesson-left">
                                                {lesson.completed ? <CheckCircle2 className="icon-complete" /> :
                                                    lesson.locked ? <Lock className="icon-locked" /> :
                                                        <Icon className="icon-lesson" />}
                                                <div>
                                                    <p className={`lesson-title ${lesson.locked ? "locked-text" : ""}`}>
                                                        {lesson.title}
                                                    </p>
                                                    <p className="lesson-duration">{lesson.duration}</p>
                                                </div>
                                            </div>
                                            {lesson.locked && <Badge variant="outline">Premium</Badge>}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="lesson-buttons">
                                <Button className="button-primary" onClick={() => onNavigate("lesson")}>
                                    Continue Learning
                                </Button>
                                <Button variant="outline" onClick={() => onNavigate("quiz")}>
                                    Take Quiz
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent className="tabs-content" value="instructor">
                    <Card>
                        <CardContent>
                            <div className="instructor-detail">
                                <img
                                    src={course.instructorImg}
                                    alt={course.instructor}
                                    className="instructor-img-large"
                                />
                                <div>
                                    <h3>{course.instructor}</h3>
                                    <p>{course.instructorTitle}</p>
                                    <div className="instructor-stats">
                                        <div>
                                            <p>{course.rating}</p>
                                            <p>Rating</p>
                                        </div>
                                        <div>
                                            <p>{course.students}</p>
                                            <p>Students</p>
                                        </div>
                                        <div>
                                            <p>{course.totalCourses || 1}</p>
                                            <p>Courses</p>
                                        </div>
                                    </div>
                                    <p>{course.instructorBio}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
