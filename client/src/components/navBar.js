import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import { jwtDecode } from "jwt-decode";
import "./navBar.css";
import logo from "../assets/logo.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";

function Navbar() {
  const ADMIN = process.env.REACT_APP_ADMIN;
  const navigate = useNavigate();
  let token;
  let decoded;
  try {
    token = localStorage.getItem("token");

    if (token) {
      decoded = jwtDecode(token);
    }
    // console.log("Token:", token);
    // console.log("Decoded:", decoded);
  } catch (error) {
    console.log("Invalid token", error);
  }

  function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      // navigate("/");
      window.location.reload();
    } else {
      return;
    }
  }

  return (
    <>
      {!token ? (
        <nav className="NavBar">
          <div className="imgDiv">
            <img className="imgNav" src={logo} alt="Logo" />
          </div>
          <div className="linksHeader">
            <Link className="links" to="login">
              Login
            </Link>
            <Link className="links" to="register">
              Register
            </Link>

            <Link className="links" to="/">
              Categories
            </Link>
          </div>
        </nav>
      ) : (
        <nav className="NavBar">
          <div className="imgDiv" >
            <img className="imgNav" src={logo} alt="Logo" />
          </div>
          <div className="linksHeader">
            <Link className="links">{decoded.email}</Link>
            {token && decoded.email === ADMIN && (
              <Link className="links" to="/create">
                <PostAddRoundedIcon />
              </Link>
            )}
            <Link className="links" to="/cart">
              <AddShoppingCartIcon style={{ fontWeight: "bold" }} />
            </Link>
            <Link className="links" to="/">
              Categories
            </Link>
            <Link className="links" onClick={handleLogout}>
              Log out
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
