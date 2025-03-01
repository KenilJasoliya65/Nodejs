import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegistrationForm.css";
import { Api_URL } from "./utils/server";
import axios from "axios";
import PropTypes from "prop-types"; // ✅ Added PropTypes

const RegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[@#$%^&*!]/.test(password),
    };
    setPasswordValidation(validation);

    // Keep password rules visible until all conditions are met
    setShowPasswordRules(!Object.values(validation).every(Boolean));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!Object.values(passwordValidation).every(Boolean)) {
      alert("Password does not meet requirements!");
      return;
    }

    try {
      const response = await axios.post(`${Api_URL}user/register`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("Response:", response.data);

      if (response.status >= 200 && response.status < 300) {
        onRegister(formData);
        alert("Registration Successful!");
        navigate("/login");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        alert("Registration failed! Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Failed to register. Check console for details.");
    }
  };

  return (
    <div className="container-fluid main-div d-flex justify-content-center align-items-center vh-100">
      <div className="registration-form p-4 shadow">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 position-relative d-block password-container">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />

            {showPasswordRules && (
              <div className="password-rules">
                <ul>
                  <li
                    className={passwordValidation.length ? "valid" : "invalid"}
                  >
                    {passwordValidation.length ? "✅" : "❌"} At least 8
                    characters
                  </li>
                  <li
                    className={
                      passwordValidation.lowercase ? "valid" : "invalid"
                    }
                  >
                    {passwordValidation.lowercase ? "✅" : "❌"} One lowercase
                    letter
                  </li>
                  <li
                    className={
                      passwordValidation.uppercase ? "valid" : "invalid"
                    }
                  >
                    {passwordValidation.uppercase ? "✅" : "❌"} One uppercase
                    letter
                  </li>
                  <li
                    className={passwordValidation.number ? "valid" : "invalid"}
                  >
                    {passwordValidation.number ? "✅" : "❌"} One number
                  </li>
                  <li
                    className={
                      passwordValidation.specialChar ? "valid" : "invalid"
                    }
                  >
                    {passwordValidation.specialChar ? "✅" : "❌"} One special
                    character (@, #, $, etc.)
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-75 mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Add PropTypes validation
RegistrationForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegistrationForm;
