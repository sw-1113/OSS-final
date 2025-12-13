import React, { useState } from 'react';

function RecordWorkout() {
    const [log, setLog] = useState({
        date: new Date().toISOString().substring(0, 10),
        routineName: '',
        exercises: [
            { id: Date.now(), name: '', sets: '', reps: '', weight: '' }
        ]
    });

    // 폼 입력 값 변경 핸들러
    const handleLogChange = (e) => {
        const { name, value } = e.target;
        setLog(prevLog => ({
            ...prevLog,
            [name]: value
        }));
    };

    // 특정 운동 항목의 입력 값 변경 핸들러
    const handleExerciseChange = (id, e) => {
        const { name, value } = e.target;
        setLog(prevLog => ({
            ...prevLog,
            exercises: prevLog.exercises.map(ex =>
                ex.id === id ? { ...ex, [name]: value } : ex
            )
        }));
    };

    // 운동 항목 추가 버튼 핸들러
    const addExercise = () => {
        setLog(prevLog => ({
            ...prevLog,
            exercises: [
                ...prevLog.exercises,
                { id: Date.now(), name: '', sets: '', reps: '', weight: '' }
            ]
        }));
    };

    // 운동 항목 삭제 버튼 핸들러
    const removeExercise = (id) => {
        setLog(prevLog => ({
            ...prevLog,
            exercises: prevLog.exercises.filter(ex => ex.id !== id)
        }));
    };

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // **여기서 운동 기록 데이터를 외부 API로 전송하는 로직이 들어갑니다.**
        console.log("저장할 운동 기록:", log);
        alert('운동 기록이 저장되었습니다! (실제 API 호출은 미구현)');
        
        // 제출 후 폼 초기화
        setLog({
            date: new Date().toISOString().substring(0, 10),
            routineName: '',
            exercises: [
                { id: Date.now(), name: '', sets: '', reps: '', weight: '' }
            ]
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>✍️ 새로운 운동 기록</h2>
            <form onSubmit={handleSubmit}>
                
                {/* 날짜 및 루틴 이름 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="date" style={{ display: 'block', marginBottom: '5px' }}>날짜:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={log.date}
                            onChange={handleLogChange}
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="routineName" style={{ display: 'block', marginBottom: '5px' }}>루틴 이름:</label>
                        <input
                            type="text"
                            id="routineName"
                            name="routineName"
                            value={log.routineName}
                            onChange={handleLogChange}
                            placeholder="예: 가슴-삼두, 전신 운동"
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>운동 목록</h3>

                {/* 운동 항목 반복 영역 */}
                {log.exercises.map((exercise, index) => (
                    <div key={exercise.id} style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        marginBottom: '15px', 
                        padding: '15px', 
                        border: '1px solid #ddd', 
                        borderRadius: '6px',
                        alignItems: 'flex-end'
                    }}>
                        {/* 운동 이름 */}
                        <div style={{ flex: 3 }}>
                            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '3px' }}>운동명</label>
                            <input
                                type="text"
                                name="name"
                                value={exercise.name}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                placeholder="예: 벤치 프레스"
                                required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        
                        {/* 세트 */}
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '3px' }}>세트</label>
                            <input
                                type="number"
                                name="sets"
                                value={exercise.sets}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        
                        {/* 횟수 */}
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '3px' }}>횟수</label>
                            <input
                                type="number"
                                name="reps"
                                value={exercise.reps}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        
                        {/* 무게 */}
                        <div style={{ flex: 1.5 }}>
                            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '3px' }}>무게 (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={exercise.weight}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        
                        {/* 삭제 버튼 */}
                        <button 
                            type="button" 
                            onClick={() => removeExercise(exercise.id)}
                            disabled={log.exercises.length === 1} // 최소 1개는 남겨둡니다.
                            style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            삭제
                        </button>
                    </div>
                ))}
                
                {/* 운동 추가 버튼 */}
                <button 
                    type="button" 
                    onClick={addExercise}
                    style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
                >
                    + 운동 항목 추가
                </button>

                {/* 최종 저장 버튼 */}
                <button 
                    type="submit"
                    style={{ padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '1.1em' }}
                >
                    🏋️‍♂️ 운동 기록 저장하기
                </button>

            </form>
        </div>
    );
}

export default RecordWorkout;