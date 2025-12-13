import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const MOCK_API_URL = 'https://6915405b84e8bd126af939f2.mockapi.io/FitnessTracker'; 

// 날짜 포맷팅 유틸 함수 (YYYY-MM-DD 형식)
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const transformLogs = (data) => {
    return data.reduce((acc, log) => {
        // 운동 상세 내용을 문자열로 조합 (예: 벤치 프레스 5x5 (60kg), 덤벨 로우 4x10 (20kg))
        // RecordWorkout에서 저장된 exercises 배열을 사용
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
        });
        return acc;
    }, {});
};


function LogHistory() {
    const [date, setDate] = useState(new Date()); 
    // 전체 로그를 저장하고 관리하는 상태 (날짜를 키로 하는 객체 형식)
    const [allLogs, setAllLogs] = useState({}); 
    // 달력에서 선택된 날짜의 로그만 저장하는 상태
    const [selectedLogs, setSelectedLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 컴포넌트 마운트 시 MockAPI에서 운동 기록을 불러오는 로직
    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(MOCK_API_URL);
                if (!response.ok) {
                    throw new Error('데이터 불러오기 실패');
                }
                const data = await response.json();
                
                // 데이터를 캘린더/로그 목록을 위한 형식으로 변환
                const logsByDate = transformLogs(data);
                
                setAllLogs(logsByDate);
                
                // 초기 로드 시 오늘 날짜의 기록을 표시
                const initialDate = formatDate(new Date());
                setSelectedLogs(logsByDate[initialDate] || []);

            } catch (error) {
                console.error("로그 로드 중 오류 발생:", error);
                alert('운동 기록을 불러오지 못했습니다. 콘솔을 확인해주세요.');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    
    // 달력 날짜 변경 핸들러
    const handleDateChange = (newDate) => {
        setDate(newDate); 
        const formattedDate = formatDate(newDate);
        // allLogs 상태에서 해당 날짜의 로그를 찾아 업데이트
        const logs = allLogs[formattedDate] || []; 
        setSelectedLogs(logs); 
    };

    // 로딩 중일 때 표시
    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>데이터 로딩 중...</div>;
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
                                    <p style={{ margin: '0', fontSize: '0.9em', color: '#555' }}>{log.details}</p>
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