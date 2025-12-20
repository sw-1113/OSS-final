import { useState } from 'react';

const MOCK_API_URL = 'https://6915405b84e8bd126af939f2.mockapi.io/FitnessTracker'; 

function Edit({ logData, onSave, onCancel }) {
    
    const [editLog, setEditLog] = useState({
        ...logData,
        exercises: logData?.exercises ? logData.exercises.map(ex => ({ ...ex })) : []
    });

    const handleLogChange = (e) => {
        const { name, value } = e.target;
        setEditLog(prevLog => ({
            ...prevLog,
            [name]: value
        }));
    };

    const handleExerciseChange = (id, e) => {
        const { name, value } = e.target;
        setEditLog(prevLog => ({
            ...prevLog,
            exercises: prevLog.exercises.map(ex =>
                ex.id === id ? { ...ex, [name]: value } : ex
            )
        }));
    };

    const addExercise = () => {
        setEditLog(prevLog => ({
            ...prevLog,
            exercises: [
                ...prevLog.exercises,
                { id: Date.now(), name: '', sets: '', reps: '', weight: '' }
            ]
        }));
    };

    const removeExercise = (idToRemove) => {
        setEditLog(prevLog => ({
            ...prevLog,
            exercises: prevLog.exercises.filter(ex => ex.id !== idToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editLog.routineName || editLog.exercises.some(ex => !ex.name || !ex.sets)) {
            alert('루틴 이름과 운동 항목의 필수 정보를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(`${MOCK_API_URL}/${editLog.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editLog), 
            });

            if (!response.ok) {
                throw new Error('API 수정 실패: ' + response.statusText);
            }

            const result = await response.json();
            console.log("수정된 운동 기록:", result);
            alert(`운동 기록이 성공적으로 수정되었습니다!`);
            onSave(); 

        } catch (error) {
            console.error("운동 기록 수정 중 오류 발생:", error);
            alert(`운동 기록 수정 실패: ${error.message}`);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '2px solid #007bff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 123, 255, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#007bff' }}>📝 운동 기록 수정</h2>
            <p style={{ textAlign: 'center', color: '#555', marginBottom: '20px' }}>날짜: {editLog.date}</p>
            
            <form onSubmit={handleSubmit}>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>루틴 이름:</label>
                    <input
                        type="text"
                        name="routineName"
                        value={editLog.routineName}
                        onChange={handleLogChange}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                </div>

                <h3 style={{ borderBottom: '1px solid #007bff', paddingBottom: '10px', marginTop: '30px', color: '#007bff', fontSize: '1.2em' }}>수정할 운동 항목</h3>
                
                {editLog.exercises.map((exercise) => (
                    <div key={exercise.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px', marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'flex-end', backgroundColor: '#e9f7ff' }}>
                        
                        <div style={{ flex: '2 1 45%' }}> 
                            <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em' }}>운동 이름</label>
                            <input
                                type="text"
                                name="name"
                                value={exercise.name}
                                onChange={(e) => handleExerciseChange(exercise.id, e)}
                                required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        
                        <div style={{ flex: '1 1 15%' }}>
                            <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em' }}>세트</label>
                            <input type="number" name="sets" value={exercise.sets} onChange={(e) => handleExerciseChange(exercise.id, e)} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div style={{ flex: '1 1 15%' }}>
                            <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em' }}>반복</label>
                            <input type="number" name="reps" value={exercise.reps} onChange={(e) => handleExerciseChange(exercise.id, e)} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div style={{ flex: '1 1 15%' }}>
                            <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.9em' }}>무게(kg)</label>
                            <input type="number" name="weight" value={exercise.weight} onChange={(e) => handleExerciseChange(exercise.id, e)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        
                        <button 
                            type="button" 
                            onClick={() => removeExercise(exercise.id)}
                            disabled={editLog.exercises.length === 1}
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

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                    <button 
                        type="button"
                        onClick={onCancel}
                        style={{ padding: '12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '48%', fontSize: '1em' }}
                    >
                        취소
                    </button>
                    <button 
                        type="submit"
                        style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '48%', fontSize: '1em' }}
                    >
                        수정 완료 (저장)
                    </button>
                </div>

            </form>
        </div>
    );
}

export default Edit;