import React from 'react'
import { SlUser, SlUserFollow, SlBasket } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
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
    navigate('/cart')
  }

  const goToCreateAccount = () => {
    navigate('/create')
  }



  return (
    <div>
      <div className='navbar'>
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

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
