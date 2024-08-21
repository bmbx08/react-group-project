import React from 'react'
import "./MyInfoPage.style.css"

const MyInfoPage = () => {
  const gender = 'Female'; // 성별 변수 ('Male' 또는 'Female')

    const profileImage = gender === 'Female'
        ? "https://i.pinimg.com/736x/d2/c2/f6/d2c2f676a3533d92ca55addd26aa19c2.jpg"
        : "https://cdn-icons-png.flaticon.com/512/1077/1077063.png";

    return (
        <div className="info-container">
            <h1 className="info-title">My Page</h1>
            <div className="profileSection">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="profileImage"
                />
                <div className="info">
                    <div><strong>Name:</strong> Hong Gil-dong</div>
                    <div><strong>Gender:</strong> {gender}</div>
                    <div><strong>Email ID:</strong> skrrrrwear@bu.ac.kr</div>
                    <div><strong>Contact:</strong> 010-1234-1234</div>
                    <div><strong>Birth:</strong> 2003년 10월 11일</div>
                    <div><strong>Address:</strong> 충남 천안시 동남구 문암로 80</div>
                </div>
            </div>
        </div>
    );
}

export default MyInfoPage
