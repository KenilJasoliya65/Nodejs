import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Password reset link has been sent to ${email}`);
      navigate("/login"); 
    } else {
      alert("Please enter your email address.");
    }
  };

  return (
    <div className="forgot-password-form shadow p-4">
      <h2 className="text-center mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-secondary w-50">
          Send Reset Link
        </button>
      </form>
      <button
        onClick={() => navigate("/login")}
        className="btn btn-link w-100 text-decoration-none mt-3"
      >
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
