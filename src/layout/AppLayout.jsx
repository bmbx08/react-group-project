import React, {useState} from "react";
import {SlUser, SlUserFollow, SlBasket, SlMagnifier} from "react-icons/sl";
import {Outlet, useNavigate} from "react-router-dom";
import {Dropdown, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import emptyHeart from "../common/images/item-card/emptyheart3.png"
import "./AppLayout.style.css";

const AppLayout = ({authenticate, setAuthenticate}) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="custom-dropdown"
    >
      {children}
      &#x25bc;
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  const navigate = useNavigate();

  // Navbar 함수들
  const goToHome = () => {
    navigate("/");
  };

  const goToItem = () => {
    navigate("/items");
  };

  // const goToNotice = () => {
  //   navigate("/notice");
  // };

  // const goToQna = () => {
  //   navigate("/qna");
  // };

  // const goToReview = () => {
  //   navigate("/review");
  // };

  const goToShopInfo = () => {
    navigate("/shopinfo");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/login/signup");
  };

  const goToMyPage = () => {
    navigate("/userpage");
  };

  const goToShoppingCart = () => {
    navigate("/userpage/mycart");
  };

  const goToFavorites=()=>{
    navigate("/userpage/favorite")
  }


  const handleLogout = () => {
    setAuthenticate(false);
    navigate("/");
    alert('로그아웃되었습니다!');
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
            <div className="notice-button">
              <div className="notice-text">공지</div>
            </div>
            <div className="qna-button">
              <div className="qna-text">문의</div>
            </div>
            <div className="review-button">
              <div className="review-text">리뷰</div>
            </div>
          </div>
          <h1 className="logo-area" onClick={goToHome}>
            Skrrrr Wear
          </h1>
          <div className="nav-right">
            {authenticate ? (
              <>
              <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                내 정보
              </Dropdown.Toggle>
          
              <Dropdown.Menu as={CustomMenu}>
                <Dropdown.Item  onClick={goToMyPage}>마이페이지</Dropdown.Item>
                <Dropdown.Item onClick={goToShoppingCart}><SlBasket className="shoppingCart-icon dropdown-icon" />
                장바구니</Dropdown.Item>
                <Dropdown.Item onClick={goToFavorites}><img src={emptyHeart} width="15px" height="15px" className="dropdown-icon"/>관심목록</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="logout-button" onClick={handleLogout}>
            <SlUser className="user-icon" />
            <div className="logout-text">로그아웃</div>
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
      <Outlet />
    </div>
  );
};

export default AppLayout;
