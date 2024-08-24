import React, { useState, useEffect } from "react";
import "./MyInfoPage.style.css";

const MyInfoPage = () => {
  const [username, setUsername] = useState(""); // 'name'을 'username'으로 변경
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);

    if (storedUser) {
      setUsername(storedUser.name || ""); // 'setName'을 'setUsername'으로 변경
      setGender(storedUser.gender || "");
      setEmail(storedUser.email || "");
      setPhone(storedUser.phone || "");
      setBirth(storedUser.birth || "");
      setAddress(storedUser.address || "");
    }
  }, []);

  const profileImage =
    gender === "Female"
      ? "https://i.pinimg.com/736x/d2/c2/f6/d2c2f676a3533d92ca55addd26aa19c2.jpg"
      : "https://cdn-icons-png.flaticon.com/512/1077/1077063.png";

  return (
    <div className="info-container">
      <h1 className="info-title">My Page</h1>
      <div className="profileSection">
        <img src={profileImage} alt="Profile" className="profileImage" />
        <div className="info">
          <div>
            <strong>Name:</strong> {username}{" "}
            {/* 'name'을 'username'으로 변경 */}
          </div>
          <div>
            <strong>Gender:</strong> {gender}
          </div>
          <div>
            <strong>Email ID:</strong> {email}
          </div>
          <div>
            <strong>Contact:</strong> {phone}
          </div>
          <div>
            <strong>Birth:</strong> {birth}
          </div>
          <div>
            <strong>Address:</strong> {address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
