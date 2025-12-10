import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css'; 

const fetchUserInfoApi = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                height: 178, 
                weight: 75, 
                age: 32,
                gender: 'male',
            });
        }, 1000); 
    });
};


function Mypage() {
    const [userInfo, setUserInfo] = useState({
        height: '',
        weight: '',
        age: '',
        gender: 'male',
    });
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        setIsLoading(true);

        fetchUserInfoApi()
            .then(data => {
                setUserInfo(data);
            })
            .catch(error => {
                console.error("사용자 정보 로드 실패:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("저장할 개인 정보:", userInfo);
        alert('개인 정보가 저장되었습니다! (실제 API 호출은 미구현)');
    };

    if (isLoading) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h2>로딩 중... 🔃</h2>
                <p>개인 정보를 불러오는 중입니다.</p>
            </div>
        );
    }
    
    return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2>👤 마이페이지: 개인 정보 설정</h2>
            <p>정확한 운동 추천을 위해 키, 몸무게, 나이 등의 정보를 입력해주세요.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px', textAlign: 'left' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <label>성별:</label>
                    <label>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="male" 
                            checked={userInfo.gender === 'male'} 
                            onChange={handleChange}
                        /> 남성
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="female" 
                            checked={userInfo.gender === 'female'} 
                            onChange={handleChange}
                        /> 여성
                    </label>
                </div>
                
                <div>
                    <label htmlFor="height">키 (cm):</label>
                    <input 
                        id="height"
                        type="number"
                        name="height"
                        value={userInfo.height}
                        onChange={handleChange}
                        placeholder="예: 175"
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label htmlFor="weight">몸무게 (kg):</label>
                    <input 
                        id="weight"
                        type="number"
                        name="weight"
                        value={userInfo.weight}
                        onChange={handleChange}
                        placeholder="예: 70"
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label htmlFor="age">나이 (세):</label>
                    <input 
                        id="age"
                        type="number"
                        name="age"
                        value={userInfo.age}
                        onChange={handleChange}
                        placeholder="예: 30"
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
                    />
                </div>
                
                <button 
                    type="submit" 
                    style={{ padding: "10px 20px", marginTop: "20px", backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    정보 저장
                </button>
            </form>
            
            <hr style={{ margin: '30px 0' }} />
            
            <Link to="/history" style={{ textDecoration: 'none' }}>
                <button 
                    style={{ 
                        padding: "10px 20px", 
                        width: "100%", 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }}
                >
                    📅 운동 기록 보기
                </button>
            </Link>

        </div>
    );
}

export default Mypage;