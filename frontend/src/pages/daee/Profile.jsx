import React, { useEffect, useState } from 'react'
import { useGetProfileQuery } from '../../redux/api/authApi';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState("");

    const {data} = useGetProfileQuery();

    useEffect(() => {
        if (data?.user) {
            setUser(data.user);
        }
    }, [data])
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">

                    <div className="card shadow border-0 rounded-4">
                        <div className="card-body p-4">

                            {/* Top Section */}
                            <div className="d-flex align-items-center gap-4 flex-wrap">

                                {/* Avatar */}
                                <div
                                    className="bg-warning d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        fontSize: "32px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>

                                {/* User Info */}
                                <div>
                                    <h3 className="mb-1 fw-bold">{user.name}</h3>
                                    <p className="text-muted mb-1">{user.email}</p>
                                    <span className={`badge ${user.role === "amir" ? "bg-warning" : "bg-success"} ${user.role === "amir" ? "text-dark" : ""} text-uppercase`}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            <hr className="my-4" />

                            {/* Details Section */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted">Phone</small>
                                        <div className="fw-semibold">{user.phone}</div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted">Minor Jamat</small>
                                        <div className="fw-semibold">{user.minorJamat}</div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted">User ID</small>
                                        <div className="fw-semibold">{user._id}</div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted">Joined</small>
                                        <div className="fw-semibold">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-end gap-2">
                                <Link to="/me/update">
                                    <button className="btn btn-outline-warning text-dark">
                                        Edit Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile