import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 시트

// 이 파일에서는 실제 운동 기록 데이터가 없으므로, 더미 데이터를 사용합니다.
// 실제 애플리케이션에서는 서버에서 데이터를 가져와야 합니다.
const dummyLogs = {
    // 날짜는 'YYYY-MM-DD' 형식으로 저장
    '2025-12-05': [
        { id: 1, routine: '상체 루틴', details: '벤치 프레스 5x5, 덤벨 로우 4x10' },
        { id: 2, routine: '유산소', details: '러닝머신 30분' }
    ],
    '2025-12-09': [
        { id: 3, routine: '하체 루틴', details: '스쿼트 5x5, 레그 익스텐션 3x12' }
    ],
    '2025-12-15': [
        { id: 4, routine: '전신 루틴', details: '데드리프트 3x5, 오버헤드 프레스 3x10' }
    ],
};

function LogHistory() {
    // 현재 달력에서 선택된 날짜 (Date 객체)
    const [date, setDate] = useState(new Date()); 
    // 선택된 날짜의 운동 기록 (배열)
    const [selectedLogs, setSelectedLogs] = useState([]);

    // 날짜 포맷팅 함수 (YYYY-MM-DD)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 달력에서 날짜를 클릭했을 때 호출되는 함수
    const handleDateChange = (newDate) => {
        setDate(newDate); // 선택된 날짜 업데이트
        
        // 포맷된 날짜를 사용하여 더미 데이터에서 기록 찾기
        const formattedDate = formatDate(newDate);
        const logs = dummyLogs[formattedDate] || [];
        setSelectedLogs(logs); // 해당 날짜의 기록 업데이트
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>🗓️ 지난 운동 기록 보기</h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                {/* 달력 컴포넌트 */}
                <Calendar
                    onChange={handleDateChange} // 날짜 선택 핸들러
                    value={date} // 현재 선택된 값
                    // 달력에 기록이 있는 날짜를 표시하는 기능 (선택 사항)
                    tileContent={({ date, view }) => {
                        if (view === 'month') {
                            const formattedDate = formatDate(date);
                            // 더미 데이터에 기록이 있으면 점 표시
                            if (dummyLogs[formattedDate]) {
                                return <div style={{ color: 'red', fontSize: '10px', lineHeight: '10px' }}>•</div>;
                            }
                        }
                    }}
                />
            </div>
            
            <hr />
            
            <h3>
                {formatDate(date)}의 운동 기록
            </h3>

            {/* 선택된 날짜의 기록 목록 */}
            {selectedLogs.length > 0 ? (
                <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                    {selectedLogs.map((log) => (
                        <div key={log.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
                            <h4>{log.routine}</h4>
                            <p>{log.details}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>선택된 날짜에는 기록된 운동이 없습니다.</p>
            )}
        </div>
    );
}

export default LogHistory;