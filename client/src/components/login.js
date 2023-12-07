import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      let res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      if (res.status === 200) {
        // alert(res.data.msg);
        Swal.fire({
          title: "Welcome",
          text: email,
          customClass: {
            popup: "custom-popup-class",
            confirmButton: "btn-ok",
          },
        });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      // alert("Log in failed, check your email or password.");
      Swal.fire({
        title: "Log in failed, check your email or password",
        // text: "You clicked the button!",
        icon: "error",
        customClass: {
          popup: "custom-popup-class",
          confirmButton: "btn-ok-fail",
        },
      });
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="outerDiv">
      <div className="mainDiv">
        <div className="photoDiv"></div>
        <div className="login">
          {/* <h1>Login</h1> */}
          <form className="loginForm" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              className="email"
              id="email"
              type="email"
              value={email}
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pass">Password</label>
            <div className="password-input-container">
              <input
                className="password"
                id="pass"
                type={showPassword ? "text" : "password"}
                placeholder=""
                size="40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash onClick={togglePasswordVisibility} />
              ) : (
                <FaEye onClick={togglePasswordVisibility} />
              )}
            </div>
            <button className="button" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
