import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Tashkil = ({ tashkil }) => {
    const { user } = useSelector((state) => state.auth);

    const isDaee = user?._id === tashkil.daee._id;
    return (
        <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">

            {/* Top Accent Bar */}
            <div
                className="w-100"
                style={{
                    height: "6px",
                    background: "linear-gradient(90deg, #ffe100, #001510)"
                }}
            ></div>

            <div className="card-body d-flex flex-column p-4">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 className="fw-bold text-dark mb-1">
                            <i className="bi bi-building me-2 text-warning"></i>
                            {tashkil.name}
                        </h5>
                        <p className="text-muted small mb-0">
                            <i className="bi bi-geo-alt-fill me-1 text-danger"></i>
                            {tashkil.address.town}, {tashkil.address.city}
                        </p>
                    </div>

                    {/* Status Icon */}
                    <i className="bi bi-check-circle-fill text-warning fs-5" title="Active"></i>
                </div>

                {/* Contact Info */}
                <div className="mb-3">
                    <div className="bg-light rounded-3 p-2 small text-muted">
                        <i className="bi bi-telephone-fill me-2 text-dark"></i>
                        <a className="text-dark text-decoration-none" href={`tel:+91${tashkil.phone}`}>{tashkil.phone}</a>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="row g-2 mb-3">
                    <div className="col-6">
                        <div className="bg-dark text-white text-center rounded-3 p-2">
                            <small className="d-block opacity-75">
                                <i className="bi bi-cash-stack me-1"></i>
                                Wasooli
                            </small>
                            <strong>{tashkil.wasooli}</strong>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="bg-warning text-center rounded-3 p-2">
                            <small className="d-block opacity-75">
                                <i className="bi bi-people-fill me-1"></i>
                                Jamat
                            </small>
                            <strong>{tashkil.jamat}</strong>
                        </div>
                    </div>
                </div>

                {/* Daee Info */}
                <div className="d-flex align-items-center gap-2 mb-4">
                    <div
                        className="bg-warning d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                            width: "36px",
                            height: "36px",
                            fontSize: "14px",
                            fontWeight: "bold"
                        }}
                    >
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <div>
                        <small className="text-muted d-block">
                            <i className="bi bi-person-badge me-1"></i>
                            Daee
                        </small>
                        <span className="fw-semibold">
                            {tashkil.daee?.name}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                {
                    isDaee && (
                        <div className="mt-auto">
                            <Link to={`/tashkils/${tashkil._id}/update`}>
                                <button className="btn btn-warning w-100 rounded-pill fw-semibold">
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Edit Tashkil
                                </button>
                            </Link>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Tashkil;
