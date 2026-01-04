import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { CourseListPage } from "./pages/CoursesListPage";
import "./pages/loginpage.css";
import "./pages/courselist.css";

function App() {
    const [currentPage, setCurrentPage] = useState("login");

    const handleNavigate = (page) => setCurrentPage(page);

    return (
        <>
            {currentPage === "login" && <LoginPage onNavigate={handleNavigate} />}
            {currentPage === "register" && <RegisterPage onNavigate={handleNavigate} />}
            {currentPage === "forgot-password" && <ForgotPasswordPage onNavigate={handleNavigate} />}
            {currentPage === "courses" && <CourseListPage onNavigate={handleNavigate} />}
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><App /></React.StrictMode>);
