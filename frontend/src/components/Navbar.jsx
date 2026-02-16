import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../redux/api/authApi";
import { useSelector } from "react-redux";

const Navbar = () => {
    const navigate = useNavigate();
    const [logoutUser, { isLoading }] = useLogoutUserMutation();
    const [search, setSearch] = useState("");

    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            alert("Logout Successfully");
            navigate("/");
        } catch (error) {
            alert(error?.data?.message);
        }
    };

    const searchHandler = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/?keyword=${search}`);
        } else {
            navigate("/");
        }
        setSearch("");
    };

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                background: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                position: "sticky",
                top: 0,
                zIndex: 1100
            }}
        >
            <div className="container">

                {/* Brand */}
                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                    style={{
                        letterSpacing: "1px",
                        fontSize: "1.3rem",
                        color: "#f5c542"
                    }}
                >
                    <i className="bi bi-moon-stars-fill me-2"></i>
                    TAHRIK E IMAAN
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">

                    {/* Center Menu */}
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
                        <li className="nav-item">
                            <Link className="nav-link text-warning text-uppercase" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-warning text-uppercase" to="/tashkils">
                                My Tashkils
                            </Link>
                        </li>
                    </ul>

                    {/* Right Side */}
                    <div className="d-flex align-items-center gap-3">

                        {/* Search */}
                        <form
                            onSubmit={searchHandler}
                            className="d-flex align-items-center"
                            style={{
                                background: "rgba(255,255,255,0.08)",
                                borderRadius: "50px",
                                padding: "4px 10px"
                            }}
                        >
                            <i className="bi bi-search text-light me-2"></i>
                            <input
                                type="search"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    color: "#fff",
                                    width: "150px"
                                }}
                            />
                        </form>

                        {/* Profile / Login */}
                        {user ? (
                            <div className="dropdown">
                                <button
                                    className="btn d-flex align-items-center gap-2"
                                    data-bs-toggle="dropdown"
                                    style={{
                                        background: "rgba(255,255,255,0.08)",
                                        borderRadius: "50px",
                                        padding: "5px 12px",
                                        color: "#fff"
                                    }}
                                >
                                    {/* Avatar */}
                                    <div
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            background: "#f5c542",
                                            color: "#000",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <span className="small">
                                        {user.name}
                                    </span>
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                                    <li>
                                        <Link className="dropdown-item" to="/me">
                                            <i className="bi bi-person me-2"></i>
                                            Profile
                                        </Link>
                                    </li>

                                    {user?.role === "amir" && (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/amir/dashboard"
                                            >
                                                <i className="bi bi-speedometer2 me-2"></i>
                                                Dashboard
                                            </Link>
                                        </li>
                                    )}

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={handleLogout}
                                            disabled={isLoading}
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i>
                                            {isLoading
                                                ? "Logging out..."
                                                : "Logout"}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link
                                className="btn"
                                to="/login"
                                style={{
                                    background: "#f5c542",
                                    color: "#000",
                                    borderRadius: "50px",
                                    padding: "6px 18px",
                                    fontWeight: "600"
                                }}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;