import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../redux/api/authApi';

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (userData.password[0] !== userData.password[0].toUpperCase()) {
      newErrors.password = "Password must start with a capital letter";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });

    // Clear field error when typing
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
      const result = await loginUser(userData).unwrap();
      alert(result.message);
      navigate("/");
    } catch (error) {
      alert(error?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f5f7fa" }}
    >
      <div className="card shadow-lg border-0 rounded-4" style={{ width: "100%", maxWidth: "420px" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold">Sign in to your account</h2>

          <form onSubmit={handleSubmit} noValidate>
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

            {/* Button */}
            <button
              type="submit"
              className="btn btn-warning w-100 fw-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {/* Register link */}
            <p className="text-center mt-4 mb-0">
              New user?{" "}
              <Link to="/register" className="fw-semibold text-decoration-none">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
