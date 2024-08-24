import React from 'react'
import { SlUser, SlUserFollow, SlBasket, SlMagnifier } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";

import { Outlet, useNavigate } from 'react-router-dom';
import "./AppLayout.style.css";

const AppLayout = () => {
  const navigate = useNavigate() 
  //Navbar functions
  const goToHome = () => {
    navigate('/')
  }

  const goToItem = () => {
    navigate('/item')
  }

  const goToNotice = () => {
    navigate('/notice')
  }

  const goToQna = () => {
    navigate('/qna')
  }

  const goToReview = () => {
    navigate('/review')
  }

  const goToShopInfo = () => {
    navigate('/shopinfo')
  }

  const goToLogin = () => {
    navigate('/login')
  }

  const goToShoppingCart = () => {
    navigate('/userpage/myCart')
  }

  const goToCreateAccount = () => {
    navigate('/create')
  }

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`?q=${event.target.value}`);
    }
  };

  // Footer functions
  const url = "https://github.com/bmbx08/react-group-project"
    const goToGit = () => {
        window.open(url)
    }

    const goToTc = () => {
        navigate('/terms&conditions')
    }
    const goToG = () => {
        navigate('/guide')
    }
    const goToPp = () => {
        navigate('/policyprivacy')
    }

  return (
    <div>
      <div className=''>  {/* .navbar 클래스이름 bootstrap이랑 충돌남 */}
        <div className='nav-box'>
          <div className='nav-left'>
            <div className='item-button' onClick={goToItem}>
              <div className='item-text'>제품</div>
            </div>
            <div className='shopinfo-button' onClick={goToShopInfo}>
              <div className='shopinfo-text'>소개</div>
            </div>
            <div className='notice-button' onClick={goToNotice}>
              <div className='notice-text'>공지</div>
            </div>
            <div className='qna-button' onClick={goToQna}>
              <div className='qna-text'>문의</div>
            </div>
            <div className='review-button' onClick={goToReview}>
              <div className='review-text'>리뷰</div>
            </div>
          </div>
          <a className='logo-area' onClick={goToHome}>Skrrrr Wear</a>
          <div className='nav-right'>
            <div onClick={()=>navigate(`/userpage/favorite`)}>좋아요 상품들</div>
            <div className='login-button' onClick={goToLogin}>
              <SlUser className="user-icon" />
              <div className='login-text'>로그인</div>
            </div>
            <div className='create-button' onClick={goToCreateAccount}>
              <SlUserFollow className="create -icon" />
              <div className='create-text'>회원가입</div>
            </div>
            <div className='shoppingCart-button' onClick={goToShoppingCart}>
              <SlBasket className="shoppingCart-icon" />
              <div className='shoppingCart-text'>장바구니</div>
            </div>
            <div className='search-button'>
              <div className='search-icon'><SlMagnifier /></div>
              <div className='search-bar'>
                <input type='text' className='text-box' onKeyPress={onCheckEnter} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='main-footer'>
                <div className='footer-1'>
                    <div className='footer-logo'>
                        Skrrrr Wear.
                    </div>
                    <div>
                        Ceo : React Team
                    </div>
                    <div>
                        skrrrrwear@bu.ac.kr
                    </div>
                </div>
                <div className='footer-2'>
                    <div>
                        31065, 5F, 516, Baekseokdaehak-ro, Cheonan-si, Chungcheongnam-do, Republic of Korea
                    </div>
                </div>
                <div className='footer-3'>
                    <div>
                        Permit Number : 2024-CheonanDongnam-0020
                    </div>
                    <div>
                        Business Number : 165-25-00692
                    </div>
                </div>
                <div className='footer-4'>
                    <div className='footer-4_1'>
                        <div className='git-icon' onClick={goToGit}><FaGithub /></div>
                        <div className='cr-text'>Copyright ⓒ React Team / Polaris</div>
                    </div>
                    <div className='footer-4_2'>
                        <div className='tc-text' onClick={goToTc}>Terms & Conditions</div>
                        <div className='g-text' onClick={goToG}>Guide</div>
                        <div className='pp-text' onClick={goToPp}>Policy Privacy</div>
                    </div>
                </div>
            </div> */}
      <Outlet/>
    </div>
  )
}

export default AppLayout
