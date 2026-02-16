import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../redux/api/authApi';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    minorJamat: ""
  });

  const [errors, setErrors] = useState({});

  const { data } = useGetProfileQuery();

  useEffect(() => {
    if (data?.user) {
      setUserData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        minorJamat: data.user.minorJamat || ""
      });
    }
  }, [data]);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Validation
  const validate = () => {
    let newErrors = {};

    // Name
    if (!userData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]{3,30}$/.test(userData.name)) {
      newErrors.name = "Name must be 3–30 letters only";
    }

    // Email
    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Phone
    if (!userData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(userData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    // Minor Jamat
    if (!userData.minorJamat) {
      newErrors.minorJamat = "Minor Jamat is required";
    } else if (Number(userData.minorJamat) <= 0) {
      newErrors.minorJamat = "Enter a valid Minor Jamat";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await updateProfile(userData).unwrap();
      alert(result.message);
      navigate("/me");
    } catch (error) {
      alert(error?.data?.message || "Update failed");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f5f7fa" }}
    >
      <div className="card shadow-lg border-0 rounded-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold">Update Profile</h2>

          <form onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                type="text"
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                type="text"
                name="phone"
                placeholder="Phone"
                maxLength="10"
                value={userData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            {/* Minor Jamat */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.minorJamat ? "is-invalid" : ""}`}
                type="number"
                name="minorJamat"
                placeholder="Minor Jamat"
                value={userData.minorJamat}
                onChange={handleChange}
              />
              {errors.minorJamat && (
                <div className="invalid-feedback">{errors.minorJamat}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;