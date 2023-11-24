import { Link } from "react-router-dom";
import React from "react";
import "./footer.css"
import logo from "../assets/logo.png";


function Footer() {
  

  return (
    <>
      <footer className="footer">
      <img className="imgNav" src={logo} alt="Logo" />
      <div>
        <p>La Casa &copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
      <div>
        <h3>linkedin</h3>
        <h3>github</h3>
      </div>
    </footer>
      
    </>
  );
}

export default Footer;
