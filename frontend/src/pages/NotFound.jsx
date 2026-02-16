import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container text-center py-5">
            <h1 className="display-4 fw-bold">404</h1>
            <p className="text-muted">Page not found</p>
            <Link to="/" className="btn btn-success rounded-pill">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
