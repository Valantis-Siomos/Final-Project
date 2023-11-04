
import { useNavigate, Link } from "react-router-dom";
import "./navBar.css";



function NavBar() {
    const navigate = useNavigate();


    navigate("/login")




    return (
        <>
        <nav>
            <div className="navbar">
                <Link to="/login">login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
        </>
    )
}

export default NavBar;