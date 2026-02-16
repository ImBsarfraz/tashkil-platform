import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div
            className="d-flex flex-column"
            style={{ minHeight: "100vh" }}
        >
            <Navbar />

            {/* Page content */}
            <main className="flex-grow-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
