import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './LoginPage.style.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext(); // setIsLoggedIn을 객체에서 가져옴

  const handleLogin = (e) => {
    e.preventDefault();

    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser);

    // 입력된 정보와 비교
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      navigate('/');
    } else if (storedUser && storedUser.username === username && storedUser.password === password) {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <Container style={{ width: '540px' }}>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디를 입력해주세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="loginsignup">
          <Button variant="primary" type="submit">
            로그인
          </Button>

          <div className="signup" onClick={() => navigate("signup")}>
            회원가입
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
