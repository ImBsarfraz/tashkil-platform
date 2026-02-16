import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTashkilDetailsQuery, useUpdateTashkilMutation } from '../../redux/api/tashkilApi';

const UpdateTashkil = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tashkil, setTashkil] = useState({
    name: "",
    phone: "",
    jamat: "",
    wasooli: "",
    address: {
      town: "",
      city: ""
    }
  });

  const [errors, setErrors] = useState({});

  const { data } = useGetTashkilDetailsQuery(id);
  const [updateTashkil, { isLoading }] = useUpdateTashkilMutation();

  useEffect(() => {
    if (data?.tashkil) {
      setTashkil(data.tashkil);
    }
  }, [data]);

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!tashkil.name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]{3,30}$/.test(tashkil.name)) {
      newErrors.name = "Name must be 3–30 letters only";
    }

    if (!tashkil.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(tashkil.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!tashkil.jamat) {
      newErrors.jamat = "Jamat is required";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\s]{2,30}$/.test(tashkil.jamat)) {
      newErrors.jamat = "Jamat must contain letters and numbers";
    }

    if (!tashkil.wasooli) {
      newErrors.wasooli = "Wasooli is required";
    } else if (Number(tashkil.wasooli) <= 0) {
      newErrors.wasooli = "Enter a valid amount";
    }

    if (!tashkil.address.town) {
      newErrors.town = "Town is required";
    }

    if (!tashkil.address.city) {
      newErrors.city = "City is required";
    }

    return newErrors;
  };

  // Fixed handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "town" || name === "city") {
      setTashkil((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setTashkil((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await updateTashkil({ id, body: tashkil }).unwrap();
      alert(result.message);
      navigate("/");
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
          <h2 className="text-center mb-4 fw-bold">Update Tashkil</h2>

          <form onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                type="text"
                name="name"
                placeholder="Tashkil name"
                value={tashkil.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                type="text"
                name="phone"
                placeholder="Phone"
                value={tashkil.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            {/* Jamat */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.jamat ? "is-invalid" : ""}`}
                type="text"
                name="jamat"
                placeholder="Jamat"
                value={tashkil.jamat}
                onChange={handleChange}
              />
              {errors.jamat && <div className="invalid-feedback">{errors.jamat}</div>}
            </div>

            {/* Wasooli */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.wasooli ? "is-invalid" : ""}`}
                type="number"
                name="wasooli"
                placeholder="Wasooli"
                value={tashkil.wasooli}
                onChange={handleChange}
              />
              {errors.wasooli && <div className="invalid-feedback">{errors.wasooli}</div>}
            </div>

            {/* Town */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.town ? "is-invalid" : ""}`}
                type="text"
                name="town"
                placeholder="Town"
                value={tashkil.address.town}
                onChange={handleChange}
              />
              {errors.town && <div className="invalid-feedback">{errors.town}</div>}
            </div>

            {/* City */}
            <div className="mb-3">
              <input
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                type="text"
                name="city"
                placeholder="City"
                value={tashkil.address.city}
                onChange={handleChange}
              />
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Tashkil"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTashkil;
