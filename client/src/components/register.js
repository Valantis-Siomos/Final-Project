import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    navigate("/login")
  }

  return (
    <div>
      <form onSubmit={handleRegister} >
        <h2>Register</h2>
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}

export default Register;
