import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './SignupPage.style.css'
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    addresss: '',
    phone: '',
    phoneTwo: '',
    phoneThree: '',
    email: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    referrer: '',
    gender: '',
    lunarCalendar: ''
  });

  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleComplete = (data) => {
    setZoneCode(data.zonecode);
    setAddress(data.address);
    handleClose();
  };

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePasswords = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePasswordStrength = (password) => {
    const minLength = 10;
    const maxLength = 16;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValidLength = password.length >= minLength && password.length <= maxLength;
    const validCombinationCount = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;

    return isValidLength && validCombinationCount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !password ||
      !confirmPassword ||
      !formData.name ||
      !formData.addresss ||
      !zoneCode ||
      !address ||
      !formData.phoneTwo ||
      !formData.phoneThree ||
      !formData.email ||
      !formData.birthYear ||
      !formData.birthMonth ||
      !formData.birthDay ||
      !formData.gender
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.phoneTwo.length !== 4 || formData.phoneThree.length !== 4) {
      alert('휴대전화 번호는 각 4자리여야 합니다.');
      return;
    }

    if (!validatePasswordStrength(password)) {
      alert('비밀번호는 영문 대소문자/숫자/특수문자 중 2가지 이상 조합이며, 10자~16자 사이여야 합니다.');
      return;
    }

    // 사용자 정보를 로컬 스토리지에 저장
    localStorage.setItem('user', JSON.stringify({
      username: formData.username,
      password: password,
      email: formData.email,
      name: formData.name,
      zoneCode: zoneCode,
      address: address,
      addresss: formData.addresss,
      phone: `${formData.phone}-${formData.phoneTwo}-${formData.phoneThree}`,
      gender: formData.gender,
      birth: `${formData.birthYear}년 ${formData.birthMonth}월 ${formData.birthDay}일`,
    }));

    // 모든 검증 통과 시 로그인 페이지로 이동
    navigate('/login');
  };

  return (
    <Container style={{ width: '540px' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>아이디.</Form.Label>
          <Form.Control type="text" placeholder="아이디를 입력해주세요." name="username"
            value={formData.username}
            onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호.</Form.Label>
          <Form.Control type="password" value={password}
            onChange={handlePasswordChange} onInput={(e) => {
              if (e.target.value.length > 16) e.target.value = e.target.value.slice(0, 16);
            }} placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호 확인.</Form.Label>
          <Form.Control type="password" value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={validatePasswords}
            placeholder={passwordError} onInput={(e) => {
              if (e.target.value.length > 16) e.target.value = e.target.value.slice(0, 16);
            }}
            className="text-right" />
          {passwordError && (
            <Form.Text className="text-danger" style={{ textAlign: 'right' }}>
              {passwordError}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>이름.</Form.Label>
          <Form.Control type="text" name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>주소.</Form.Label>
          <div className='zone'>
            <Form.Control style={{ width: '150px' }} type="text" value={zoneCode} readOnly />
            <Button variant="link" onClick={openPostcode} style={{ color: 'black' }}>
              우편번호검색
            </Button>
          </div>
          <Form.Control
            type="text"
            value={address}
            placeholder="기본주소"
            readOnly
            className="mt-2"
          />
          <Form.Control
            type="text"
            placeholder="나머지주소"
            className="mt-2"
            name="addresss"
            value={formData.addresss}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Label>휴대전화</Form.Label>
          <Form.Group as={Col} controlId="formGridNumber">
            <Form.Select style={{ borderRadius: '0' }} defaultValue="010" name="phone"
              value={!formData.phone ? formData.phone = "010" : formData.phone}
              onChange={handleInputChange}>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="018">018</option>
              <option value="019">019</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNumber">
            <Form.Control type="number" name="phoneTwo"
              value={formData.phoneTwo}
              onChange={handleInputChange} onInput={(e) => {
                if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
              }} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNumber">
            <Form.Control type="number" name="phoneThree"
              value={formData.phoneThree}
              onChange={handleInputChange}
              onInput={(e) => {
                if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
              }} />
          </Form.Group>
          <Form.Text className="text-muted">
            휴대폰 번호를 입력하세요.
          </Form.Text>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일.</Form.Label>
          <Form.Control type="email" name="email"
            value={formData.email}
            onChange={handleInputChange} />
        </Form.Group>

        <Form>
          <Form.Label>성별</Form.Label>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="남자"
                name="gender"
                type={type}
                id={`inline-${type}-1`}
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="여자"
                name="gender"
                type={type}
                id={`inline-${type}-2`}
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </Form>

        <Form>
          <Form.Label>생년월일</Form.Label>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="양력"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                defaultChecked
              />
              <Form.Check
                inline
                label="음력"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
              />
            </div>
          ))}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridBorn">
              <Form.Control type="number" placeholder="년"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleInputChange} onInput={(e) => {
                  if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
                }} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBorn">
              <Form.Control type="number" placeholder="월"
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleInputChange} onInput={(e) => {
                  if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
                }} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBorn">
              <Form.Control type="number" placeholder="일"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleInputChange} onInput={(e) => {
                  if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
                }} />
            </Form.Group>
          </Row>
        </Form>

        {/* <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>추천인 아이디</Form.Label>
          <Form.Control type="text" name="referrer"
            value={formData.referrer}
            onChange={handleInputChange} />
        </Form.Group> */}

        <Button style={{ borderRadius: '0' }} variant="dark" type="submit" className='JoinButton'>
          Join
        </Button>
      </Form>
    </Container>

  )
}

export default SignupPage
