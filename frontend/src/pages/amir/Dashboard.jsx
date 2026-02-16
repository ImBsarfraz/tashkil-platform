import React, { useEffect, useState } from "react";
import { useGetAllTashkilsQuery } from "../../redux/api/tashkilApi";
import { useGetAllUsersQuery } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const navigate = useNavigate();
    const [tashkils, setTashkils] = useState([]);
    const [daees, setDaees] = useState([]);

    const { data } = useGetAllTashkilsQuery();


    const { data: usersData } = useGetAllUsersQuery();

    useEffect(() => {
        if (data?.tashkils) {
            setTashkils(data.tashkils);
        }
        if (usersData?.users) {
            setDaees(usersData.users);
        }
    }, [data]);

    const totalWasooli = tashkils.reduce(
        (total, tashkil) => total + tashkil.wasooli,
        0
    )

    const chartData = tashkils.map((t) => ({
        name: t.name,
        wasooli: t.wasooli
    }));

    const tashkilsByUser = Object.values(
        tashkils.reduce((acc, tashkil) => {
            const daeeName = tashkil.daee?.name || "Unknown";

            if (!acc[daeeName]) {
                acc[daeeName] = {
                    name: daeeName,
                    count: 0
                };
            }

            acc[daeeName].count += 1;

            return acc;
        }, {})
    );

    return (
        <div className="container py-5">

            {/* Page Title */}
            <div className="mb-4">
                <h2 className="fw-bold">
                    <i className="bi bi-speedometer2 me-2 text-success"></i>
                    Dashboard
                </h2>
                <p className="text-muted">
                    Overview of your Tashkil activities
                </p>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-5">

                {/* Total Tashkils */}
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <small className="text-muted">Total Tashkils</small>
                                    <h3 className="fw-bold mb-0">{tashkils.length}</h3>
                                </div>
                                <div className="bg-warning text-dark rounded-circle p-3">
                                    <i className="bi bi-building fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Wasooli */}
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <small className="text-muted">Total Wasooli</small>
                                    <h3 className="fw-bold mb-0">₹{totalWasooli}</h3>
                                </div>
                                <div className="bg-dark text-white rounded-circle p-3">
                                    <i className="bi bi-cash-stack fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Jamats */}
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <small className="text-muted">Active Daees</small>
                                    <h3 className="fw-bold mb-0">{daees.length}</h3>
                                </div>
                                <div className="bg-warning text-dark rounded-circle p-3">
                                    <i className="bi bi-people-fill fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="row g-4">

                {/* Recent Tashkils */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">
                                <i className="bi bi-clock-history me-2"></i>
                                Recent Tashkils
                            </h5>

                            <ul className="list-group list-group-flush">

                                {
                                    tashkils.map((tashkil, idx) => (
                                        <li key={idx} className="list-group-item d-flex justify-content-between">
                                            <span>
                                                <i className="bi bi-building me-2 text-success"></i>
                                                {tashkil.name} – {tashkil.address.town}, {tashkil.address.city}
                                            </span>
                                            <span className="text-muted small">{tashkil.createdAt}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">
                                <i className="bi bi-lightning-charge me-2"></i>
                                Quick Actions
                            </h5>

                            <div className="d-grid gap-3">
                                {/* <button className="btn btn-success rounded-pill">
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add New Tashkil
                                </button> */}

                                <button onClick={() => navigate("/amir/dashboard/daees")} className="btn btn-outline-dark rounded-pill">
                                    <i className="bi bi-people me-2"></i>
                                    View Daees
                                </button>

                                <button onClick={() => navigate("/me")} className="btn btn-outline-warning text-dark rounded-pill">
                                    <i className="bi bi-person-circle me-2"></i>
                                    My Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tashkils by Daee Chart */}
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body">
                            <h5 className="fw-bold mb-4">
                                <i className="bi bi-bar-chart-fill me-2 text-primary"></i>
                                Tashkils by Daee
                            </h5>

                            <div style={{ width: "100%", height: 350 }}>
                                <ResponsiveContainer>
                                    <BarChart data={tashkilsByUser}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#ffc107" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wasooli Chart */}
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body">
                            <h5 className="fw-bold mb-4">
                                <i className="bi bi-bar-chart-fill me-2 text-success"></i>
                                Wasooli by Tashkil
                            </h5>

                            <div style={{ width: "100%", height: 350 }}>
                                <ResponsiveContainer>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="wasooli" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
