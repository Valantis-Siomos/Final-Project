import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    let res = await axios.post("http://localhost:8000/register", {
      email,
      password,
    });
    alert(res.data.msg);
    // navigate("/login");
  }

  return (
    <div className="outerDivRegister">
      <div className="mainDivRegister">
        <div className="photoDivRegister"></div>
        <div className="register">
          {/* <h1>Register</h1> */}
          <form className="registerForm" onSubmit={handleRegister}>
            <label htmlFor="userEmail">Email</label>
            <input
              id="userEmail"
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              className="password"
              id="password"
              type="password"
              placeholder="password"
              size="40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
