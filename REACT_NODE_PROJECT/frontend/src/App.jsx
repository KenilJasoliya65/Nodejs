import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import WelcomePage from "./WelcomePage";
import ForgotPassword from "./ForgotPassword";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [registeredUser, setRegisteredUser] = useState(null);

  return (
    <Router>
      <div className="main-div d-flex justify-content-center align-items-center vh-100">
        <Routes>
          <Route
            path="/register"
            element={<RegistrationForm onRegister={setRegisteredUser} />}
          />
          <Route
            path="/login"
            element={<LoginForm registeredUser={registeredUser} />}
          />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
         
          <Route
            path="/"
            element={<RegistrationForm onRegister={setRegisteredUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
