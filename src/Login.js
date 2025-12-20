import './Main.css';
import './Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [EM, setEM] = useState("");
    const [PW, setPW] = useState("");
    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPW, setSignUpPW] = useState("");
    const navigate = useNavigate();

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
            localStorage.setItem("user", JSON.stringify(user));
            setIsLoggedIn(true);
            alert("로그인 성공!");
            navigate("/Main");
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };

    const DoSignUp = async (e) => {
        e.preventDefault();

        if (!signUpName || !signUpEmail || !signUpPW) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const checkRes = await fetch(
            `http://localhost:3001/users?email=${signUpEmail}`
        );
        const checkData = await checkRes.json();

        if (checkData.length > 0) {
            alert("이미 가입된 이메일입니다.");
            return;
        }

        const response = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: signUpName,
                email: signUpEmail,
                password: signUpPW,
            }),
        });

        if (!response.ok) {
            alert("회원가입 실패");
            return;
        }

        alert("회원가입 성공! 로그인 해주세요.");

        setSignUpName("");
        setSignUpEmail("");
        setSignUpPW("");
        setIsSignUp(false);
    };


    return (
        <div className="wrapper">
            <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>

                <div className="sign-up-container">
                    <form onSubmit={DoSignUp}>
                        <h1>Create Account</h1>

                        <input
                            type="text"
                            placeholder="Name"
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={signUpPW}
                            onChange={(e) => setSignUpPW(e.target.value)}
                        />

                        <button className="form_btn" type="submit">
                            Sign Up
                        </button>
                    </form>
                </div>


                <div className="sign-in-container">
                    <form onSubmit={DoLogin}>
                        <h1>Sign In</h1>

                        <div className="social-links">
                            <div><a href="#"><i className="fa fa-facebook" /></a></div>
                            <div><a href="#"><i className="fa fa-twitter" /></a></div>
                            <div><a href="#"><i className="fa fa-linkedin" /></a></div>
                        </div>

                        <span>or use your account</span>

                        <input
                            type="email"
                            placeholder="Email"
                            value={EM}
                            onChange={(e) => setEM(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={PW}
                            onChange={(e) => setPW(e.target.value)}
                        />

                        <button className="form_btn" type="submit">Sign In</button>

                        {isLoggedIn && <p style={{ color: "green" }}>로그인 성공!</p>}
                    </form>
                </div>

                <div className="overlay-container">

                    <div className="overlay-left">
                        <h1>Welcome Back</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button
                            id="signIn"
                            className="overlay_btn"
                            onClick={() => setIsSignUp(false)}
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="overlay-right">
                        <h1>Hello, Friend</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button
                            id="signUp"
                            className="overlay_btn"
                            onClick={() => setIsSignUp(true)}
                        >
                            Sign Up
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Login;