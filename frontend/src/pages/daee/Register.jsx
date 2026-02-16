import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/api/authApi';

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    minorJamat: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // Validation function
  const validate = () => {
    let newErrors = {};

    // Name
    if (!userData.name) {
      newErrors.name = "Name is required";
    } else if (userData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z\s]+$/.test(userData.name)) {
      newErrors.name = "Name can contain only letters";
    }

    // Email
    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Phone
    if (!userData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(userData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    // Minor Jamat
    if (!userData.minorJamat) {
      newErrors.minorJamat = "Minor Jamat is required";
    } else if (Number(userData.minorJamat) <= 0) {
      newErrors.minorJamat = "Enter a valid Minor Jamat";
    }

    // Password
    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/^[A-Z]/.test(userData.password)) {
      newErrors.password = "Password must start with a capital letter";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });

    // Clear field error while typing
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
      const result = await registerUser(userData).unwrap();
      alert(result.message);
      navigate("/");
    } catch (error) {
      alert(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center p-5"
      style={{ minHeight: "100vh", background: "#f5f7fa" }}
    >
      <div className="card shadow-lg border-0 rounded-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold">Create an account</h2>

          <form onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Name</label>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                type="text"
                name="name"
                placeholder="Enter your name"
                value={userData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Email</label>
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Phone */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Phone</label>
              <input
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                type="text"
                name="phone"
                placeholder="Enter your phone"
                value={userData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>

            {/* Minor Jamat */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Minor Jamat</label>
              <input
                className={`form-control ${errors.minorJamat ? "is-invalid" : ""}`}
                type="number"
                name="minorJamat"
                placeholder="Enter your minor jamat"
                value={userData.minorJamat}
                onChange={handleChange}
              />
              {errors.minorJamat && (
                <div className="invalid-feedback">{errors.minorJamat}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Password</label>
              <input
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                type="password"
                name="password"
                placeholder="Enter your password"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 fw-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="text-center mt-4 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none">
                Login here
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;