import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';
import ModalPayment from './ModalPayment';

const AddToCartModal = ({ show, handleClose, item }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const numericPrice = Number(item.lprice.replace(/,/g, ''));

  useEffect(() => {
    setTotalPrice(quantity * numericPrice);
  }, [quantity, numericPrice]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("사이즈와 컬러를 선택해주세요.");
      return;
    }

    dispatch({
      type: 'ADD_CART', // 변경된 액션 타입
      payload: {
        name: item.title,
        img: item.image,
        price: totalPrice, // 단일 가격 전달
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      },
    });
    navigate('/userpage/Mycart');
    handleClose();
  };

  const handleSelectClick = (event) => {
    event.stopPropagation();
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease') {
      if (quantity > 1) {
        setQuantity(prev => prev - 1);
      } else {
        alert("최소 주문량은 1개입니다.");
      }
    }
  };

  const handleBuyNow = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} onClick={handleModalClick}>
        <Modal.Header closeButton>
          <Modal.Title>장바구니 담기</Modal.Title>
        </Modal.Header>
        <Modal.Body onClick={handleModalClick}>
          <img src={item.image} alt={item.title} style={{ width: '100%' }} />
          <h4>{item.title}</h4>
          <div>
            <label>사이즈 선택:</label>
            <select 
              onClick={handleSelectClick} 
              onChange={(e) => setSelectedSize(e.target.value)} 
              value={selectedSize}
            >
              <option value="">사이즈를 선택하세요</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <div>
            <label>컬러 선택:</label>
            <select 
              onClick={handleSelectClick} 
              onChange={(e) => setSelectedColor(e.target.value)} 
              value={selectedColor}
            >
              <option value="">컬러를 선택하세요</option>
              <option value="blue">blue</option>
              <option value="green">green</option>
              <option value="pink">pink</option>
              <option value="gray">gray</option>
              <option value="yellow">yellow</option>
            </select>
          </div>
          <div>
            <label>수량:</label>
            <div>
              <Button variant="outline-secondary" onClick={() => handleQuantityChange('decrease')}>-</Button>
              <span style={{ margin: '0 10px' }}>{quantity}</span>
              <Button variant="outline-secondary" onClick={() => handleQuantityChange('increase')}>+</Button>
            </div>
          </div>
          <div>총 가격: {(quantity * numericPrice).toLocaleString()} 원</div>
          
          <ReactPaginate 
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
        </Modal.Body>
        <Modal.Footer onClick={handleModalClick}>
          <Button variant="secondary" onClick={handleClose}>
            계속 쇼핑하기
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            장바구니로 이동
          </Button>
          <Button variant="success" onClick={handleBuyNow}>
            바로 구매하기
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalPayment 
        show={showPaymentModal} 
        handleClose={handleClosePaymentModal} 
        totalPrice={totalPrice} 
      />
    </>
  );
};

export default AddToCartModal;
