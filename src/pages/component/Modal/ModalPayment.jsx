import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalPayment = ({ show, handleClose, totalPrice}) => {
  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg" onClick={handleModalClick}>
      <Modal.Header closeButton>
        <Modal.Title>결제 페이지</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="payment-container">
          <h5>결제 금액: KRW {totalPrice}</h5>

          <div className="payment-section">
            <h6>결제 수단</h6>
            <div className="payment-methods">
              <label>
                <input type="radio" name="paymentMethod" value="creditCard" defaultChecked />
                신용카드
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="bankTransfer" />
                계좌이체
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="kakaoPay" />
                카카오페이
              </label>
            </div>
          </div>

          <div className="shipping-section">
            <h6>배송지 정보</h6>
            <input type="text" placeholder="받는 사람" className="form-control" />
            <input type="text" placeholder="주소" className="form-control" style={{ marginTop: '10px' }} />
            <input type="text" placeholder="연락처" className="form-control" style={{ marginTop: '10px' }} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success">결제하기</Button>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPayment;
