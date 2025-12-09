import './Main.css';
import { Link } from "react-router-dom";

function Main() {
    return (
        <>


            <main style={{ padding: "40px", textAlign: "center" }}>

                <h1>“오늘 한 만큼 내일 더 강해질 거야.”</h1>
                <p>운동을 기록하고, 추천 루틴을 받아보세요.</p>

                <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>

                    <button style={{ padding: "10px 20px", width: "200px" }}>
                        운동 기록하기
                    </button>

                    <button style={{ padding: "10px 20px", width: "200px" }}>
                        운동 추천 받기
                    </button>

                    <Link to="/history" style={{ textDecoration: 'none' }}>
                        <button style={{ padding: "10px 20px", width: "200px" }}>
                            지난 기록 보기
                        </button>
                    </Link>

                </div>
            </main>

            <footer style={{ marginTop: "50px", padding: "20px", textAlign: "center", color: "#777" }}>
                © 2025-2 Open studio
            </footer>
        </>
    );
}

export default Main;