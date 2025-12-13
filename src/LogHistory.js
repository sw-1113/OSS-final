import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const dummyLogs = {
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

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


function LogHistory() {
    const [date, setDate] = useState(new Date()); 
    const [selectedLogs, setSelectedLogs] = useState(dummyLogs[formatDate(new Date())] || []); 
    
    const handleDateChange = (newDate) => {
        setDate(newDate); 
        const formattedDate = formatDate(newDate);
        const logs = dummyLogs[formattedDate] || [];
        setSelectedLogs(logs); 
    };

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
                    textAlign: 'left'
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
                                if (dummyLogs[formattedDate]) {
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
                                <div key={log.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.05)' }}>
                                    <h4>{log.routine}</h4>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#555' }}>{log.details}</p>
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