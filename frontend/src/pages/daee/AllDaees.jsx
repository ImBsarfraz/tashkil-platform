import React, { useEffect, useState } from 'react';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from '../../redux/api/authApi';
import { Link } from 'react-router-dom';

const AllDaees = () => {
    const [daees, setDaees] = useState([]);
    const { data, isLoading } = useGetAllUsersQuery();
    const [deleteUser, { isLoading: deleteIsLoading }] = useDeleteUserMutation();
    const [updateUser, { isLoading: updateIsLoading }] = useUpdateUserMutation();

    useEffect(() => {
        if (data?.users) {
            setDaees(data.users);
        }
    }, [data]);

    const handleDelete = async (id) => {
        const result = await deleteUser(id).unwrap();
        alert(result.message);
    }

    const handleRoleChange = async (id, currentRole) => {
        const newRole = currentRole === "amir" ? "daee" : "amir";

        try {
            const result = await updateUser({
                id,
                body: { role: newRole }
            }).unwrap();

            alert(result.message);
        } catch (error) {
            alert(error?.data?.message);
        }
    }

    if (isLoading) {
        return (
            <div className="container text-center mt-5">
                <h4>Loading Daees...</h4>
            </div>
        );
    }

    return (
        <div className="container py-5">

            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold">
                    <i className="bi bi-people-fill me-2 text-warning"></i>
                    All Daees
                </h2>
                <p className="text-muted">
                    List of all registered daees in the system
                </p>
            </div>

            {/* Cards Grid */}
            <div className="row g-4">
                {daees.map((daee) => (
                    <div className="col-md-6 col-lg-4" key={daee._id}>
                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body d-flex flex-column p-4">

                                {/* Top Section */}
                                <div className="d-flex align-items-center gap-3 mb-3">

                                    {/* Avatar */}
                                    <div
                                        className="bg-warning d-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            fontSize: "18px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {daee.name?.charAt(0)}
                                    </div>

                                    {/* Name & Role */}
                                    <div>
                                        <h5 className="fw-bold mb-0">
                                            {daee.name}
                                        </h5>
                                        <span className="badge bg-dark text-uppercase">
                                            {daee.role}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="mb-3">
                                    <p className="text-muted small mb-1">
                                        <i className="bi bi-envelope me-2"></i>
                                        {daee.email}
                                    </p>
                                    <p className="text-muted small mb-0">
                                        <i className="bi bi-telephone me-2"></i>
                                        {daee.phone}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="bg-light rounded-3 p-2 text-center mb-4">
                                    <small className="text-muted d-block">
                                        Minor Jamat
                                    </small>
                                    <strong>{daee.minorJamat}</strong>
                                </div>

                                {/* Footer */}
                                <div className="mt-auto d-flex justify-content-between">
                                    <button onClick={() => handleDelete(daee._id)} className="btn btn-outline-danger btn-sm rounded-pill">
                                        <i className="bi bi-trash me-1"></i>
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleRoleChange(daee._id, daee.role)}
                                        className={`btn btn-sm rounded-pill ${daee.role === "amir"
                                                ? "btn-outline-primary"
                                                : "btn-outline-warning text-dark"
                                            }`}
                                    >
                                        {daee.role === "amir" ? (
                                            <>
                                                <i className="bi bi-people-fill me-1"></i>
                                                Make Daee
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-person-badge-fill me-1"></i>
                                                Make Amir
                                            </>
                                        )}
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AllDaees;
