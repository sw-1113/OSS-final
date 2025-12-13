import { useState } from 'react';

const MOCK_API_URL = 'https://6915405b84e8bd126af939f2.mockapi.io/FitnessTracker'; 

function Record() {
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
    const removeExercise = (idToRemove) => {
        setLog(prevLog => ({
            ...prevLog,
            exercises: prevLog.exercises.filter(ex => ex.id !== idToRemove)
        }));
    };

    // 폼 제출 (저장) 핸들러 - MockAPI 연동
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!log.routineName || log.exercises.some(ex => !ex.name || !ex.sets)) {
            alert('루틴 이름과 운동 항목의 필수 정보를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(MOCK_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(log), 
            });

            if (!response.ok) {
                throw new Error('API 호출 실패: ' + response.statusText);
            }

            const result = await response.json();
            console.log("저장된 운동 기록:", result);
            alert(`운동 기록이 성공적으로 저장되었습니다!`);
            
            // 저장 후 폼 초기화
            setLog({
                date: new Date().toISOString().substring(0, 10),
                routineName: '',
                exercises: [
                    { id: Date.now(), name: '', sets: '', reps: '', weight: '' }
                ]
            });

        } catch (error) {
            console.error("운동 기록 저장 중 오류 발생:", error);
            alert(`운동 기록 저장 실패: ${error.message}. MockAPI URL을 확인해주세요.`);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>🏋️‍♂️ 새로운 운동 기록</h2>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>날짜:</label>
                    <input
                        type="date"
                        name="date"
                        value={log.date}
                        onChange={handleLogChange}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>루틴 이름:</label>
                    <input
                        type="text"
                        name="routineName"
                        placeholder="예: 상체 근력 운동, 전신 루틴"
                        value={log.routineName}
                        onChange={handleLogChange}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                </div>

                <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '30px', color: '#555' }}>운동 항목</h3>
                
                {log.exercises.map((exercise, index) => (
                    <div key={exercise.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px', marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'flex-end', backgroundColor: '#f9f9f9' }}>
                        
                        <div style={{ flex: '2 1 45%' }}> 
                            <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em' }}>운동 이름</label>
                            <input
                                type="text"
                                name="name"
                                value={exercise.name}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                placeholder="벤치 프레스"
                                required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        
                        <div style={{ flex: '1 1 auto' }}>
                            <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em' }}>세트</label>
                            <input
                                type="number"
                                name="sets"
                                value={exercise.sets}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ flex: '1 1 auto' }}>
                            <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em' }}>반복(Reps)</label>
                            <input
                                type="number"
                                name="reps"
                                value={exercise.reps}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ flex: '1 1 auto' }}>
                            <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em' }}>무게(kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={exercise.weight}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        
                        <button 
                            type="button" 
                            onClick={() => removeExercise(exercise.id)}
                            disabled={log.exercises.length === 1}
                            style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            삭제
                        </button>
                    </div>
                ))}
                
                <button 
                    type="button" 
                    onClick={addExercise}
                    style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
                >
                    + 운동 항목 추가
                </button>

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

export default Record;