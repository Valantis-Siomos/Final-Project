import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

  },[]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      
      const response = await axios.post(
        "http://localhost:8000/login",
        { email, password }
      );

      if (response.status === 200) {
        navigate("/home");
      } else {
        alert("Check your email or password");
      }
    } catch (err) {
      console.log(err);
      alert("Error with the login");
    }
  }
  return (
    <div>
        <form onSubmit={handleLogin}>
        <h2>Log in</h2>
        <br />
        <label>Email</label>
        <br />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Log in" />
        </form>
    </div>
  )
}

export default Login;
