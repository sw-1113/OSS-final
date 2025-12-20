import { useState } from "react";
import "./Search.css";

function Search() {
    const [query, setQuery] = useState("");
    const [workouts, setWorkouts] = useState([]);

    const searchWorkout = async () => {
        const url = `https://exercisedb.p.rapidapi.com/exercises/name/${query}`;

        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "9208d3d7f5mshcb962e4ae400fd1p17997cjsne6858f834cd2",
                "x-rapidapi-host": "exercisedb.p.rapidapi.com",
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setWorkouts(data);
    };

    return (
        <div className="recommend-container">

            <div className="search-area">
                <input
                    className="search-input"
                    placeholder="운동 이름 입력 (예: squat, chest)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            searchWorkout();
                        }
                    }}
                />

                <button className="search-btn" onClick={searchWorkout}>
                    검색
                </button>
            </div>

            <div className="workout-list">
                {workouts.map((w) => (
                    <div className="workout-card" key={w.id}>
                        <h3>{w.name}</h3>
                        <p>운동 부위: {w.bodyPart}</p>
                        <p>타겟 근육: {w.target}</p>
                        <p>장비: {w.equipment}</p>

                        {w.gifUrl && (
                            <img className="workout-img" src={w.gifUrl} alt={w.name} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;