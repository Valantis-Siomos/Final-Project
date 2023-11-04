import React from "react";
import { Link, useNavigate } from "react-router-dom";



function Home() {
  return (
    <div>
      <div>
         
         <p> <span><Link to="/login" className="linkLogIn">Log in </Link></span></p>
         <p> Or <span><Link to="/register" className="linkLogIn">Register</Link></span></p>
      </div>
    </div>
  );
}

export default Home;
