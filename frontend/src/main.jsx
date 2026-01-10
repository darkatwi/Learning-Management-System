import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { CourseListPage } from "./pages/CoursesListPage";
import { CourseDetailPage } from "./pages/CourseDetailPage"; // import detail page
import "./pages/loginpage.css";
import "./pages/courselist.css";
import "./pages/coursedetail.css";

function App() {
    const [currentPage, setCurrentPage] = useState("login");
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const path = window.location.pathname.replace("/", "");
        if (path === "reset-password") setCurrentPage("reset-password");
    }, []);

    const handleNavigate = (page) => {
        setCurrentPage(page);
        window.history.pushState({}, "", `/${page}`);
    };

    const handleSelectCourse = (course) => {
        setSelectedCourse(course);
        setCurrentPage("course-detail");
        window.history.pushState({}, "", `/course-detail`);
    };

    return (
        <>
            {currentPage === "login" && <LoginPage onNavigate={handleNavigate} />}
            {currentPage === "register" && <RegisterPage onNavigate={handleNavigate} />}
            {currentPage === "forgot-password" && <ForgotPasswordPage onNavigate={handleNavigate} />}
            {currentPage === "reset-password" && <ResetPasswordPage onNavigate={handleNavigate} />}
            {currentPage === "courses" && (
                <CourseListPage onNavigate={handleNavigate} onSelectCourse={handleSelectCourse} />
            )}
            {currentPage === "course-detail" && selectedCourse && (
                <CourseDetailPage course={selectedCourse} onNavigate={handleNavigate} />
            )}
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
