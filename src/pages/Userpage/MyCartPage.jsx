import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import ModalPayment from '../component/Modal/ModalPayment';
import './MyCartPage.style.css'
const MyCartPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const totalPrice = useSelector((state) => state.totalPrice);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품들을 추적하는 상태
  const [selectedTotalPrice, setSelectedTotalPrice] = useState(0); // 선택된 제품들의 총 가격을 추적하는 상태
  const [isSelectOrder, setIsSelectOrder] = useState(false); // 선택상품주문인지 전체상품주문인지 구분하는 상태

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.color);
    setSelectedSize(product.size);
    setQuantity(product.quantity);
    setProductTotalPrice(product.price * product.quantity);
    setShowModal(true);
  };

  const handleShowPaymentModal = (isSelect) => {
    if (isSelect) {
      // 선택상품주문 버튼이 클릭되었을 때
      const selectedTotalPrice = selectedProducts.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      setSelectedTotalPrice(selectedTotalPrice); // 선택된 상품들의 총 가격 업데이트
    }
    setIsSelectOrder(isSelect); // 선택상품주문인지 상태 설정
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => setShowPaymentModal(false);

  const handleCloseModal = () => setShowModal(false);

  const productDelete = (product) => {
    dispatch({ type: 'REMOVE_CART', payload: product });
  };

  const handleAddOrUpdateProduct = () => {
    const updatedProduct = {
      name: selectedProduct.name,
      color: selectedColor,
      size: selectedSize,
      price: selectedProduct.price,
      img: selectedProduct.img,
      quantity,
    };

    if (
      selectedProduct.color === selectedColor &&
      selectedProduct.size === selectedSize
    ) {
      // 동일한 옵션이 선택된 경우, 수량만 증가
      dispatch({ type: 'ADD_CART', payload: updatedProduct });
    } else {
      // 옵션이 변경된 경우, 새로운 옵션으로 제품 업데이트
      dispatch({
        type: 'UPDATE_CART',
        payload: {
          ...updatedProduct,
          currentColor: selectedProduct.color,
          currentSize: selectedProduct.size,
        },
      });
    }

    handleCloseModal();
  };

  const incrementQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      updateProductTotalPrice(newQuantity, selectedProduct.price);
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const newQuantity = prev - 1;
        updateProductTotalPrice(newQuantity, selectedProduct.price);
        return newQuantity;
      });
    } else {
      alert('최소 주문량은 1개입니다');
    }
  };

  const updateProductTotalPrice = (newQuantity, price) => {
    const total = newQuantity * price;
    setProductTotalPrice(total);
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleProductSelect = (product, isChecked) => {
    if (isChecked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>
              <input type="checkbox" />
            </th>
            <th>IMAGE</th>
            <th>PRODUCT NAME</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>POINT</th>
            <th>DELIVERY</th>
            <th>CHARGE</th>
            <th>TOTAL</th>
            <th>ORDER</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((option, index) => (
            <tr key={index} className="text-center">
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleProductSelect(option, e.target.checked)}
                />
              </td>
              <td>
                <img
                  src={option.img}
                  style={{ width: '50px' }}
                  alt={option.name}
                />
              </td>
              <td>{option.name}</td>
              <td>{option.price}원</td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => handleShowModal(option)}
                >
                  옵션 변경
                </button>
              </td>
              <td>-</td>
              <td>기본배송</td>
              <td>무료</td>
              <td>{option.price * option.quantity}원</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => productDelete(option)}
                >
                  DELETE
                </Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-right">
        <hr />
        <h3 className='totalprice_text'>
          상품구매금액 {totalPrice}원 + 배송비 0 (무료) 합계 : {totalPrice}원
        </h3>
        <hr />
      </div>
      <div className="cart-resetbutton">
        <Button variant="danger" onClick={clearCart}>
          장바구니 비우기
        </Button>
      </div>

      {/* 결제 정보 테이블 */}
      <Table
        bordered
        className="mt-4 text-center"
        style={{ borderColor: 'black' }}
      >
        <thead>
          <tr>
            <th>총 상품금액</th>
            <th>총 배송비</th>
            <th>총 할인금액</th>
            <th>결제예정금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalPrice}원</td>
            <td>0원</td>
            <td>0원</td>
            <td>{totalPrice}원</td>
          </tr>
        </tbody>
      </Table>

      <div className="text-center mt-4">
        {/* 전체상품주문 버튼 */}
        <Button
          variant="dark"
          className="mr-3"
          onClick={() => handleShowPaymentModal(false)}
        >
          전체상품주문
        </Button>
        {/* 선택상품주문 버튼 */}
        <Button variant="secondary" onClick={() => handleShowPaymentModal(true)}>
          선택상품주문
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>옵션 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{selectedProduct && selectedProduct.name}</div>
          <hr />
          <Form.Group controlId="formColor">
            <Form.Label>색상</Form.Label>
            <Form.Control
              as="select"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="pink">Pink</option>
              <option value="gray">Gray</option>
              <option value="yellow">Yellow</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSize" className="mt-3">
            <Form.Label>사이즈</Form.Label>
            <Form.Control
              as="select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              
            </Form.Control>
          </Form.Group>
          <hr />
          <Form.Group controlId="formQuantity">
            <Form.Label>수량</Form.Label>
            <div className="d-flex align-items-center">
              <Button variant="light" onClick={decrementQuantity}>
                -
              </Button>
              <Form.Control
                type="text"
                value={quantity}
                readOnly
                className="text-center mx-2"
                style={{ width: '50px' }}
              />
              <Button variant="light" onClick={incrementQuantity}>
                +
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 결제 Modal */}
      {isSelectOrder ? (
        // 선택상품주문인 경우
        <ModalPayment
          show={showPaymentModal}
          handleClose={handleClosePaymentModal}
          totalPrice={selectedTotalPrice} // 선택된 상품들의 총 가격 전달
          selectedProducts={selectedProducts} // 선택된 제품들 전달
        />
      ) : (
        // 전체상품주문인 경우
        <ModalPayment
          show={showPaymentModal}
          handleClose={handleClosePaymentModal}
          totalPrice={totalPrice} // 전체 상품들의 총 가격 전달
        />
      )}
    </div>
  );
};

export default MyCartPage;
