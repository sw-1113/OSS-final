import './nav.css'
import { Link } from "react-router-dom";
import icon from "./icon.jpg";

function Navbar() {
    return (
        <nav>
            <ul className="container">

                <li className="">
                    <Link className="" to="Main"><h2>My Fitness Tracker</h2></Link>
                </li>
                <li className="">
                    <Link className="nav-link" to="bbb">운동 추천</Link>
                </li>
                <li className="">
                    <Link className="nav-link" to="Mypage">마이페이지</Link>
                </li>
                <img className="icon" src={icon}/>
            </ul>

        </nav>
    );
}

export default Navbar;
