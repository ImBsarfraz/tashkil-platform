import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer
            className="text-light pt-5 pb-4"
            style={{
                background: "linear-gradient(to top, #000, #0a0a0a)",
                borderTop: "1px solid rgba(255,193,7,0.2)"
            }}
        >
            <div className="container">

                {/* Top Section */}
                <div className="row gy-4">

                    {/* Brand */}
                    <div className="col-md-4">
                        <h5 className="fw-bold" style={{ color: "#f5c542" }}>
                            <i className="bi bi-moon-stars-fill me-2"></i>
                            TAHRIK E IMAAN
                        </h5>
                        <p className="small text-white">
                            A system dedicated to reviving faith, effort,
                            and good deeds through organized Tablighi work.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-2">
                        <h6 className="fw-semibold mb-3 text-warning">
                            Quick Links
                        </h6>
                        <ul className="list-unstyled small">
                            <li>
                                <Link className="text-decoration-none text-light" to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none text-light" to="/tashkils">
                                    My Tashkils
                                </Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none text-light" to="/me">
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-md-2">
                        <h6 className="fw-semibold mb-3 text-warning">
                            Resources
                        </h6>
                        <ul className="list-unstyled small">
                            <li className="text-light">Qur’an</li>
                            <li className="text-light">Hadith</li>
                            <li className="text-light">Tablighi Effort</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="col-md-4">
                        <h6 className="fw-semibold mb-3 text-warning">
                            Connect
                        </h6>
                        <div className="d-flex gap-3">

                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/917972908951"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5"
                                title="WhatsApp"
                            >
                                <i className="bi bi-whatsapp"></i>
                            </a>

                            {/* Telegram (optional link) */}
                            <a
                                href="https://t.me/mrsarfrazbagwan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5"
                                title="Telegram"
                            >
                                <i className="bi bi-telegram"></i>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:sarfrazbagwan151@gmail.com"
                                className="text-light fs-5"
                                title="Email"
                            >
                                <i className="bi bi-envelope"></i>
                            </a>

                        </div>

                    </div>
                </div>

                {/* Hadith Section */}
                <div
                    className="mt-5 p-4 rounded-4 text-center"
                    style={{
                        background: "rgba(255,193,7,0.08)",
                        border: "1px solid rgba(255,193,7,0.2)"
                    }}
                >
                    <small className="text-warning fw-semibold d-block mb-2">
                        Hadith – Musnad al-Bazzar (2928)
                        Graded: Hasan (Albani – Sahih al-Targhib 741)
                    </small>

                    {/* English Translation */}
                    <p className="mb-0 fst-italic small text-light opacity-90">
                        “Islam has eight parts: Imaan is one part, prayer is one part,
                        zakat is one part, Hajj is one part, fasting is one part,
                        enjoining good is one part, forbidding evil is one part,
                        and striving in the path of Allah is one part.
                        Indeed, the one who has no share in these has failed.”
                    </p>
                </div>

                {/* Bottom Bar */}
                <div
                    className="text-center pt-4 mt-4 small text-white"
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)"
                    }}
                >
                    © {new Date().getFullYear()} Tahrik E Imaan-Jeur. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
