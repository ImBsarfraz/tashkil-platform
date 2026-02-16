import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteTashkilMutation, useGetMyTashkilsQuery } from '../../redux/api/tashkilApi';
import { useSelector } from 'react-redux';

const AllTashkils = () => {
  const navigate = useNavigate();

  const [myTashkils, setMyTashkils] = useState([]);
  const { data, isLoading } = useGetMyTashkilsQuery();

  const { user } = useSelector((state) => state.auth);

  const [deleteTashkil, { isLoading: deleteIsLoading }] = useDeleteTashkilMutation();

  useEffect(() => {
    if (data?.tashkils) {
      setMyTashkils(data.tashkils);
    }
  }, [data]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tashkil?");
    if (!confirmDelete) return;

    try {
      const result = await deleteTashkil(id).unwrap();
      alert(result.message);
    } catch (error) {
      alert(error?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <h4>Loading Tashkils...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-building me-2 text-warning"></i>
          {user.name} Tashkils
        </h2>
        <Link to="/tashkils/create" className="btn btn-warning rounded-pill">
          <i className="bi bi-plus-lg me-1"></i>
          Add Tashkil
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="row g-4">
        {myTashkils.map((tashkil) => (
          <div className="col-md-6 col-lg-4" key={tashkil._id}>
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">

              {/* Top Accent Bar */}
              <div
                className="w-100"
                style={{
                  height: "5px",
                  background: "linear-gradient(90deg, #ffe100, #001510)"
                }}
              ></div>

              <div className="card-body d-flex flex-column p-4">

                {/* Title */}
                <h5 className="fw-bold mb-2">
                  <i className="bi bi-building me-2 text-warning"></i>
                  {tashkil.name}
                </h5>

                {/* Address */}
                <p className="text-muted small mb-3">
                  <i className="bi bi-geo-alt-fill me-1 text-danger"></i>
                  {tashkil.address.town}, {tashkil.address.city}
                </p>

                {/* Phone */}
                <div className="bg-light rounded-3 p-2 small text-muted mb-3">
                  <i className="bi bi-telephone-fill me-2"></i>
                  {tashkil.phone}
                </div>

                {/* Stats */}
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <div className="bg-dark text-white text-center rounded-3 p-2">
                      <small className="opacity-75 d-block">
                        <i className="bi bi-cash-stack me-1"></i>
                        Wasooli
                      </small>
                      <strong>₹{tashkil.wasooli}</strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-warning text-center rounded-3 p-2">
                      <small className="opacity-75 d-block">
                        <i className="bi bi-people-fill me-1"></i>
                        Jamat
                      </small>
                      <strong>{tashkil.jamat}</strong>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto d-flex justify-content-between">
                  <button 
                  onClick={() => handleDelete(tashkil._id)} 
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  disabled={deleteIsLoading}
                  >
                    <i className="bi bi-trash me-1"></i>
                    {deleteIsLoading ? "Deleting..." : "Delete"}
                  </button>
                  <Link to={`/tashkils/${tashkil._id}/update`}>
                    <button className="btn btn-warning btn-sm rounded-pill">
                      <i className="bi bi-pencil-square me-1"></i>
                      Edit
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AllTashkils;
