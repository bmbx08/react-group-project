import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 정기찬 from './image/정기찬.jpg';
import 표선영 from './image/표선영.jpg';
import 강전하 from './image/강전하.jpg';
import 김주은 from './image/김주은.jpg';
import './SiteIntroductionPage.style.css';

const SiteIntroductionPage = () => {
  return (
    <Container className="site-introduction">
      {/* Title */}
      <h1 className="title">소개</h1>
      
      {/* Description */}
      <p className="description">
        Skrrr Wear는 모던하고 세련된 남친룩과 미니멀리즘을 추구하는 패션 브랜드입니다.
        'Skrrr'는 속도와 스타일의 변화를 상징하며, 트렌드를 앞서가면서도 깔끔하고 절제된 디자인으로
        당신의 개성을 돋보이게 합니다. Skrrr Wear는 복잡함을 덜어내고, 단순하지만 세련된 아이템들로
        구성된 컬렉션을 통해, 누구나 쉽게 멋진 스타일을 완성할 수 있도록 돕습니다. 우리의 목표는
        당신의 일상에 자연스럽게 녹아들면서도, 특별함을 더하는 패션을 제안하는 것입니다.
      </p>

      {/* Developers Title */}
      <h2 className="subtitle">Developers</h2>

      {/* Developers Section */}
      <Row>
        <Col md={6} className="mb-4">
          <Card className="developer-card">
            <Row>
              <Col xs={4} className="text-center">
                <img src={정기찬} alt="정기찬" className="developer-image" />
                <h5 className="developer-name">정기찬</h5>
              </Col>
              <Col xs={8}>
                <Card.Body>
                  <Card.Text>
                    <p><strong>개발 파트 : </strong>프론트엔드</p>
                    <p><strong>개발 역할 : </strong>홈페이지, 카테고리/서치 페이지, 좋아요 페이지</p>
                    <p><strong>개발 도구 : </strong> React, HTML, CSS</p>
                    <p><strong> 기타 문의 : </strong> bmbx08@gmail.com</p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="developer-card">
            <Row>
              <Col xs={4} className="text-center">
                <img src={표선영} alt="표선영" className="developer-image" />
                <h5 className="developer-name">표선영</h5>
              </Col>
              <Col xs={8}>
                <Card.Body>
                  <Card.Text>
                    <p><strong>개발 파트 : </strong> 프론트엔드</p>
                    <p><strong>개발 역할 : </strong>디테일 페이지 총괄, 장바구니 페이지 총괄, 장바구니 연동</p>
                    <p><strong>개발 도구 : </strong> React, HTML, CSS</p>
                    <p><strong>기타 문의 : </strong> 010-8753-2616</p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="developer-card">
            <Row>
              <Col xs={4} className="text-center">
                <img src={강전하} alt="강전하" className="developer-image" />
                <h5 className="developer-name">강전하</h5>
              </Col>
              <Col xs={8}>
                <Card.Body>
                  <Card.Text>
                    <p><strong>개발 파트 : </strong>프론트엔드</p>
                    <p><strong>개발 역할 : </strong> 회원가입 , 로그인, 리뷰 and qna페이지, 배너</p>
                    <p><strong>개발 도구 : </strong> React, HTML, CSS</p>
                    <p><strong>기타 문의 : </strong> 010-5229-8339</p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="developer-card">
            <Row>
              <Col xs={4} className="text-center">
                <img src={김주은} alt="김주은" className="developer-image" />
                <h5 className="developer-name">김주은</h5>
              </Col>
              <Col xs={8}>
                <Card.Body>
                  <Card.Text>
                    <p><strong>개발 파트 : </strong>프론트엔드</p>
                    <p><strong>개발 역할 : </strong> Navbar, footer, 마이페이지, 기초 작업 세팅</p>
                    <p><strong>개발 도구 : </strong> React, HTML, CSS</p>
                    <p><strong> 기타 문의 : </strong> 010-9736-7557</p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SiteIntroductionPage;
