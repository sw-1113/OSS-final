import { useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  const [open, setOpen] = useState(false);

  return (
    <div className="main-container">
      <div
        className={`cover ${open ? "slide-up" : ""}`}
        onClick={() => setOpen(true)}
      >
        <div className="cover-text">“오늘 한 만큼 내일 더 강해질 거야.”</div>

        <div
          className="cover-trigger"
          onMouseEnter={() => setOpen(true)}
        >
          ▼ Scroll / Click
        </div>
      </div>

      <main className="main-contents">


                <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>

                    <Link to="/record" style={{ textDecoration: 'none' }}>
                        <button style={{ padding: "10px 20px", width: "200px" }}>
                            운동 기록하기
                        </button>
                    </Link>

                    <Link to="/Search" style={{ textDecoration: 'none' }}>
                      <button style={{ padding: "10px 20px", width: "200px" }}>
                          운동 추천 받기
                      </button>
                    </Link>

                    <Link to="/history" style={{ textDecoration: 'none' }}>
                        <button style={{ padding: "10px 20px", width: "200px" }}>
                            지난 기록 보기
                        </button>
                    </Link>

                </div>
            </main>
    </div>
  );
}

export default Main;
