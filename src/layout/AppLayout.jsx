import React, { useState } from "react";
import { SlUser, SlUserFollow, SlBasket, SlMagnifier } from "react-icons/sl";
import { Outlet, useNavigate } from "react-router-dom";
import "./AppLayout.style.css";

const AppLayout = () => {
  const navigate = useNavigate();

  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navbar 함수들
  const goToHome = () => {
    navigate("/");
  };

  const goToItem = () => {
    navigate("/item");
  };

  const goToNotice = () => {
    navigate("/notice");
  };

  const goToQna = () => {
    navigate("/qna");
  };

  const goToReview = () => {
    navigate("/review");
  };

  const goToShopInfo = () => {
    navigate("/shopinfo");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToShoppingCart = () => {
    navigate("/cart");
  };

  const goToSignUp = () => {
    navigate("/login/signup");
  };

  const goToMyPage = () => {
    navigate("/userpage");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`?q=${event.target.value}`);
    }
  };

  return (
    <div>
      <div className="">
        <div className="nav-box">
          <div className="nav-left">
            <div className="item-button" onClick={goToItem}>
              <div className="item-text">제품</div>
            </div>
            <div className="shopinfo-button" onClick={goToShopInfo}>
              <div className="shopinfo-text">소개</div>
            </div>
            <div className="notice-button" onClick={goToNotice}>
              <div className="notice-text">공지</div>
            </div>
            <div className="qna-button" onClick={goToQna}>
              <div className="qna-text">문의</div>
            </div>
            <div className="review-button" onClick={goToReview}>
              <div className="review-text">리뷰</div>
            </div>
          </div>
          <h1 className="logo-area" onClick={goToHome}>
            Skrrrr Wear
          </h1>
          <div className="nav-right">
            {isLoggedIn ? (
              <>
                <div className="logout-button" onClick={handleLogout}>
                  <SlUser className="user-icon" />
                  <div className="logout-text">로그아웃</div>
                </div>
                <div className="mypage-button" onClick={goToMyPage}>
                  <SlUserFollow className="mypage-icon" />
                  <div className="mypage-text">마이페이지</div>
                </div>
              </>
            ) : (
              <>
                <div className="login-button" onClick={goToLogin}>
                  <SlUser className="user-icon" />
                  <div className="login-text">로그인</div>
                </div>
                <div className="create-button" onClick={goToSignUp}>
                  <SlUserFollow className="create-icon" />
                  <div className="create-text">회원가입</div>
                </div>
              </>
            )}
            <div className="shoppingCart-button" onClick={goToShoppingCart}>
              <SlBasket className="shoppingCart-icon" />
              <div className="shoppingCart-text">장바구니</div>
            </div>
            <div className="search-button">
              <div className="search-icon">
                <SlMagnifier />
              </div>
              <div className="search-bar">
                <input
                  type="text"
                  className="text-box"
                  onKeyPress={onCheckEnter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet context={{ setIsLoggedIn }} />
    </div>
  );
};

export default AppLayout;
