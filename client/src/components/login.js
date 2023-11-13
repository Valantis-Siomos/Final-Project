import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      let res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      if (res.status === 200) {
        alert(res.data.msg);
        localStorage.setItem("token", res.data.token);
        // navigate("/");
        // const isAdmin = res.data.role === "Admin";
        // localStorage.setItem("isAdmin", isAdmin);
      }
    } catch (err) {
      alert("Log in failed, check your email or password.");
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="loginForm" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default Login;
