import React, { useState } from "react";
import { CourseListPage } from "./CourseListPage";
import { CourseDetailPage } from "./CourseDetailPage";

export function CoursesApp() {
    const [currentPage, setCurrentPage] = useState("course-list"); 
    const [selectedCourse, setSelectedCourse] = useState(null); 

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    const handleSelectCourse = (course) => {
        setSelectedCourse(course); 
    };

    return (
        <div>
            {currentPage === "course-list" && (
                <CourseListPage
                    onNavigate={handleNavigate}
                    onSelectCourse={handleSelectCourse}
                />
            )}

            {currentPage === "course-detail" && selectedCourse && (
                <CourseDetailPage
                    onNavigate={handleNavigate}
                    course={selectedCourse} 
                />
            )}

            {/* fallback if course not selected */}
            {currentPage === "course-detail" && !selectedCourse && (
                <p>No course selected.</p>
            )}
        </div>
    );
}
