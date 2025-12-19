import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import Edit from './Edit';

const MOCK_API_URL = 'https://6915405b84e8bd126af939f2.mockapi.io/FitnessTracker'; 

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const transformLogs = (data) => {
    return data.reduce((acc, log) => {
        const detailsString = log.exercises
            .map(ex => {
                const weightPart = ex.weight ? ` (${ex.weight}kg)` : '';
                return `${ex.name} ${ex.sets}x${ex.reps}${weightPart}`;
            })
            .join(', ');

        acc[log.date] = acc[log.date] || [];
        acc[log.date].push({
            id: log.id,
            routine: log.routineName, 
            details: detailsString,
            originalLog: log,
        });
        return acc;
    }, {});
};


function LogHistory() {
    const [date, setDate] = useState(new Date()); 
    const [allLogs, setAllLogs] = useState({}); 
    const [selectedLogs, setSelectedLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingLog, setEditingLog] = useState(null); 
    
    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await fetch(MOCK_API_URL);
            if (!response.ok) {
                throw new Error('데이터 불러오기 실패');
            }
            const data = await response.json();
            
            const logsByDate = transformLogs(data);
            
            setAllLogs(logsByDate);
            
            const initialDate = formatDate(date);
            setSelectedLogs(logsByDate[initialDate] || []);

        } catch (error) {
            console.error("로그 로드 중 오류 발생:", error);
            alert('운동 기록을 불러오지 못했습니다. 콘솔을 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    
    const handleDateChange = (newDate) => {
        setDate(newDate); 
        const formattedDate = formatDate(newDate);
        const logs = allLogs[formattedDate] || []; 
        setSelectedLogs(logs); 
        setEditingLog(null);
    };

    const handleDeleteLog = async (logId) => {
        if (!window.confirm('정말로 이 운동 기록을 삭제하시겠습니까?')) {
            return;
        }

        try {
            const response = await fetch(`${MOCK_API_URL}/${logId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('삭제 실패: ' + response.statusText);
            }

            alert('운동 기록이 삭제되었습니다.');
            
            fetchLogs(); 

        } catch (error) {
            console.error("로그 삭제 중 오류 발생:", error);
            alert(`삭제 실패: ${error.message}`);
        }
    };

    const handleEditLog = (log) => {
        setEditingLog(log.originalLog);
    };


    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>데이터 로딩 중...</div>;
    }

    if (editingLog) {
        return (
            <Edit
                logData={editingLog}
                onSave={() => { fetchLogs(); setEditingLog(null); }}
                onCancel={() => setEditingLog(null)} 
            />
        );
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>🗓️ 지난 운동 기록 보기</h2>
            
            <div 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '40px', 
                    marginTop: '30px',
                    maxWidth: '1000px',
                    margin: '30px auto 0 auto',
                    textAlign: 'left',
                    flexWrap: 'wrap',
                }}
            >
                
                <div style={{ flex: '0 0 auto' }}> 
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        locale="en-US"
                        tileContent={({ date, view }) => {
                            if (view === 'month') {
                                const formattedDate = formatDate(date);
                                if (allLogs[formattedDate] && allLogs[formattedDate].length > 0) {
                                    return <div style={{ color: 'red', fontSize: '10px', lineHeight: '10px', marginTop: '3px' }}>•</div>;
                                }
                            }
                        }}
                    />
                </div>
                
                
                <div style={{ flex: '1 1 50%', minWidth: '350px' }}>
                    <h3 style={{ marginTop: '0', textAlign: 'center' }}>
                        {formatDate(date)}의 운동 기록
                    </h3>
                    {selectedLogs.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {selectedLogs.map((log) => (
                                <div 
                                    key={log.id} 
                                    style={{ 
                                        border: '1px solid #ccc', 
                                        padding: '15px', 
                                        borderRadius: '8px', 
                                        boxShadow: '2px 2px 5px rgba(0,0,0,0.05)',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>{log.routine}</h4>
                                    <p style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: '#555' }}>{log.details}</p>

                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                        <button 
                                            onClick={() => handleEditLog(log)}
                                            style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            수정
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteLog(log.id)}
                                            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', color: '#777', padding: '20px', border: '1px dashed #ccc', borderRadius: '8px' }}>선택된 날짜에는 기록된 운동이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LogHistory;