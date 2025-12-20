import './Main.css';
import './Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS_API_URL = 'https://6915405b84e8bd126af939f2.mockapi.io/users';

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [EM, setEM] = useState("");
    const [PW, setPW] = useState("");
    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPW, setSignUpPW] = useState("");
    const navigate = useNavigate();

    const DoLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(USERS_API_URL);
            const data = await response.json();

            const user = data.find(u => u.email === EM && u.password === PW);

            if (!user) {
                alert("이메일 또는 비밀번호가 일치하지 않습니다.");
                return;
            }

            localStorage.setItem("user", JSON.stringify(user));
            alert("로그인 성공!");
            navigate("/Main"); 
        } catch (error) {
            console.error("로그인 중 오류:", error);
            alert("서버 연결에 실패했습니다.");
        }
    };

    const DoSignUp = async (e) => {
        e.preventDefault();

        if (!signUpName || !signUpEmail || !signUpPW) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        try {
            const checkRes = await fetch(USERS_API_URL);
            const allUsers = await checkRes.json();

            const isDuplicate = allUsers.some(u => u.email === signUpEmail);

            if (isDuplicate) {
                alert("이미 가입된 이메일입니다.");
                return;
            }

            const response = await fetch(USERS_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: signUpName,
                    email: signUpEmail,
                    password: signUpPW,
                }),
            });

            if (response.ok) {
                alert("회원가입 성공! 로그인 해주세요.");
                setSignUpName("");
                setSignUpEmail("");
                setSignUpPW("");
                setIsSignUp(false);
            }
        } catch (error) {
            console.error("회원가입 중 오류:", error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="wrapper">
            <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
                <div className="form-container sign-up-container">
                    <form onSubmit={DoSignUp}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} />
                        <input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={signUpPW} onChange={(e) => setSignUpPW(e.target.value)} />
                        <button className="form_btn" type="submit">Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={DoLogin}>
                        <h1>Sign In</h1>
                        <span>Enter your email and password</span>
                        <input type="email" placeholder="Email" value={EM} onChange={(e) => setEM(e.target.value)} />
                        <input type="password" placeholder="Password" value={PW} onChange={(e) => setPW(e.target.value)} />
                        <button className="form_btn" type="submit">Sign In</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back</h1>
                            <button className="overlay_btn" onClick={() => setIsSignUp(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend</h1>
                            <button className="overlay_btn" onClick={() => setIsSignUp(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;