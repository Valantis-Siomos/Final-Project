import { Link } from "react-router-dom";
import React from "react";
import "./footer.css";
import logo from "../assets/logo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footerMain">
          <div>
            <img className="imgNav" src={logo} alt="Logo" />
            <p className="textFooter">
              Embark on a timeless journey in the world of exquisite
              furnishings, where the dream began on September 15, 1523. At our
              furniture haven, quality is not just a promise; it's our legacy.
            </p>
            <p className="copyrights">
              La Casa &copy; {new Date().getFullYear()} | ALL RIGHTS RESERVED{" "}
            </p>
          </div>

          <div className="contact">
            <h2 className="cont" >Contct Us</h2>
            <div className="icons">
              <FaGithubSquare className="github" />
              <FaLinkedin className="linkedln" />
              <FaFacebookSquare className="facebook" />
              <FaSquareInstagram className="insta" />
              <FaSquareXTwitter className="twitter" />
              <FaYoutubeSquare className="youtube" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
