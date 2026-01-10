import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import "./Dashboard.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="brand-header">
                            <div className="brand-icon">
                                <GraduationCap className="icon" />
                            </div>
                            <span className="brand-name">SkillUp Academy</span>
                        </div>
                        <p className="brand-text">
                            Empowering learners worldwide with quality education and skills for the future.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Courses</li>
                            <li>Instructors</li>
                            <li>Blog</li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li>Help Center</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                            <li>Cookie Policy</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <ul className="contact-list">
                            <li>
                                <Mail className="contact-icon" /> lmsbywa@gmail.com
                            </li>
                            <li>
                                <Phone className="contact-icon" /> +1 (555) 123-4567
                            </li>
                            <li>
                                <MapPin className="contact-icon" /> Beirut, Lebanon
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 SkillUp Academy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
