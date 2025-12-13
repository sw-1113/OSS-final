import './nav.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import icon from "./image/icon.png";

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav>
            <ul>
                <li className="nav-left">
                    <Link to="Main"><h2>My Fitness Tracker</h2></Link>
                </li>

                <li className="right">
                    <li>
                        <Link to="Search">Search</Link>
                    </li>
                    {isLoggedIn ? (
                        <img src={icon}/>
                    ) : (
                        <>
                            <Link to="Login" className="nav-link">Login/sign up</Link>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
