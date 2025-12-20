import './nav.css';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "./image/icon.png";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/Login");
    };

    return (
        <nav>
            <ul>
                <div className="left">
                    <li>
                        <Link to="/Main">
                            <h2>My Fitness Tracker</h2>
                        </Link>
                    </li>
                </div>

                <div className="right">
                    <ul>
                        <li><Link to="/Record">Record</Link></li>
                        <li><Link to="/Mypage">Mypage</Link></li>
                        <li><Link to="/Search">Search</Link></li>

                        {isLoggedIn ? (
                            <li>
                                <Link to="/Mypage">
                                    <img
                                        src={icon}
                                        alt="profile"
                                        className="profile-icon"
                                    />
                                </Link>
                                <button type="button" onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/Login">Sign In</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;