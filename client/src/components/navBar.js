
import { useNavigate, Link } from "react-router-dom";
import "../components/navBar.css";



function NavBar() {
    // const navigate = useNavigate();


    // navigate("/login")




    return (
        <>
        <nav className="navBar">
            <div>
                <Link to="/">Home</Link>
                <Link to="/login">login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
        </>
    )
}

export default NavBar;