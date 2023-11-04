import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../components/navBar.css";


function NavBar() {
  const navigate = useNavigate();
  let token;
  let decoded;

  try {
    token = localStorage.getItem("token");
    decoded = jwtDecode(token);
  } catch (err) {
    console.log(err);
  }

  function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } else {
      return;
    }
  }

  return (
    <>
      {/* <h2>La Casa</h2> */}
      {!token ? (
        <nav className="navBar">
          <h2>La Casa</h2>
          <div>
            <Link to="/">Home</Link>
            <Link to="/login">login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      ) : (
        <nav className="navBar">
          <h2>La Casa</h2>
          <div>
            <Link to="/form">Create</Link>
            <Link to="/login">login</Link>
            <Link to="/register">Register</Link>
            <Link onClick={handleLogout} className="link">Log Out</Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
