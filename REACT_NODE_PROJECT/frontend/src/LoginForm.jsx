import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        loginData
      );
      console.log(response)
      alert(response.data.msg);
      localStorage.setItem("token", response.data.token);
      navigate("/welcome");
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed!");
    }
  };

  return (
    <div className="login-form shadow p-4">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
