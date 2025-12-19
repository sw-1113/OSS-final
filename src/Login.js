import './Main.css';
import './Login.css';
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [EM, setEM] = useState("");
    const [PW, setPW] = useState("");

    const DoLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3001/users?email=${EM}`);
        const data = await response.json();

        if (data.length === 0) {
            alert("회원가입된 이메일이 없습니다.");
            return;
        }

        const user = data[0];

        if (user.password === PW) {
            setIsLoggedIn(true);
            console.log("로그인 성공!");
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };

    return (
        <div className="wrapper">
            <div className="container">

                <div className="sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button className="form_btn" type="button">Sign Up</button>
                    </form>
                </div>

                <div className="sign-in-container">
                    <form>
                        <h1>Sign In</h1>

                        <input 
                            value={EM} 
                            onChange={(e) => setEM(e.target.value)} 
                            type="email" 
                            placeholder="Email" 
                        />

                        <input 
                            value={PW} 
                            onChange={(e) => setPW(e.target.value)} 
                            type="password" 
                            placeholder="Password" 
                        />

                        <button 
                            className="form_btn" 
                            type="button"
                            onClick={DoLogin}
                        >
                            Sign In
                        </button>

                        {isLoggedIn && <p style={{color: "green"}}>로그인 성공!</p>}
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay-left">
                        <h1>Welcome Back</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button id="signIn" className="overlay_btn">Sign In</button>
                    </div>

                    <div className="overlay-right">
                        <h1>Hello, Friend</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <Link to="Register"><button id="signUp" to="Register" className="overlay_btn">Sign Up</button></Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;