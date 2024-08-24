import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDetail } from '../../hooks/useDetail';
import { Col, Container, Row, Modal, Button, Form } from 'react-bootstrap';
import './ItemDetailPage.style.css';
import DropdownBox from './DropdownBox';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import ModalPayment from '../component/Modal/ModalPayment';

const ItemDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useDetail();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pageTotalPrice, setPageTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [showReviewModal, setShowReviewModal] = useState(false); // 리뷰 모달 상태
  const [scannerPos, setScannerPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('detail');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [reviews, setReviews] = useState([]); // 리뷰 상태
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [editIndex, setEditIndex] = useState(null);
  const [qnas, setQnas] = useState([]);
  const [showQnaModal, setShowQnaModal] = useState(false);
  const [qnaText, setQnaText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedQnaIndex, setSelectedQnaIndex] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  console.log(storedUser)

  // 로그인된 유저 정보 (예시)
  const loggedInUser = {
    name: storedUser?.name || 'Guest', // storedUser가 존재하면 name을 가져오고, 없으면 기본값 'Guest'
  };

  const sizes = ['S', 'M', 'L'];
  const colors = ['blue', 'green', 'pink', 'gray', 'yellow'];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const detailData = data?.items[id];

  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.getElementById(tab).scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const scannerSize = 150;
    const x = Math.max(Math.min(offsetX, offsetWidth - scannerSize / 2), scannerSize / 2);
    const y = Math.max(Math.min(offsetY, offsetHeight - scannerSize / 2), scannerSize / 2);

    setScannerPos({ x: x - scannerSize / 2, y: y - scannerSize / 2 });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    updateTotalPrice(quantity, detailData?.lprice);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      dispatch({
        type: 'ADD_CART',
        payload: {
          name: detailData?.title,
          price: pageTotalPrice,
          img: detailData?.image,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity,
        },
      });

      // 모달 표시
      setShowModal(true);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
      updateTotalPrice(quantity + 1, detailData?.lprice);
    } else if (type === 'decrease') {
      if (quantity > 1) {
        setQuantity(prev => prev - 1);
        updateTotalPrice(quantity - 1, detailData?.lprice);
      } else {
        alert("최소 주문량은 1개입니다.");
      }
    }
  };

  const updateTotalPrice = (newQuantity, price) => {
    const total = newQuantity * price;
    setPageTotalPrice(total);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => {
    setShowReviewModal(false)
    setReviewText('');
    setReviewRating(5);
    setEditIndex(null);
  };

  const handleShowQnaModal = () => setShowQnaModal(true);
  const handleCloseQnaModal = () => {
    setShowQnaModal(false);
    setQnaText('');
    setIsPrivate(false);
    setEditIndex(null);
  };

  const handleAddReview = (e) => {
    e.preventDefault();

    const newReview = {
      name: loggedInUser.name,
      text: reviewText,
      rating: reviewRating,
      date: new Date().toLocaleDateString(),
    };

    if (editIndex !== null) {
      // 수정 모드
      const updatedReviews = [...reviews];
      updatedReviews[editIndex] = newReview;
      setReviews(updatedReviews);
    } else {
      // 새 리뷰 추가 모드
      setReviews([...reviews, newReview]);
    }

    handleCloseReviewModal();
  };

  const handleEditReview = (index) => {
    setEditIndex(index);
    setReviewText(reviews[index].text);
    setReviewRating(reviews[index].rating);
    handleShowReviewModal();
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  const handleAddQna = (e) => {
    e.preventDefault();

    const newQna = {
      name: loggedInUser.name,
      text: qnaText,
      date: new Date().toLocaleDateString(),
      isPrivate,
    };

    if (editIndex !== null) {
      // 수정 모드
      const updatedQnas = [...qnas];
      updatedQnas[editIndex] = newQna;
      setQnas(updatedQnas);
    } else {
      // 새 Q&A 추가 모드
      setQnas([...qnas, newQna]);
    }

    handleCloseQnaModal();
  };

  const handleEditQna = (index) => {
    setEditIndex(index);
    setQnaText(qnas[index].text);
    setIsPrivate(qnas[index].isPrivate);
    handleShowQnaModal();
  };

  const handleDeleteQna = (index) => {
    const updatedQnas = qnas.filter((_, i) => i !== index);
    setQnas(updatedQnas);
  };

  const handleToggleVisibility = (index) => {
    const updatedQnas = [...qnas];
    updatedQnas[index].isPrivate = !updatedQnas[index].isPrivate;
    setQnas(updatedQnas);
  };

  const handleSelectQna = (index) => {
    setSelectedQnaIndex(index === selectedQnaIndex ? null : index);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} className="Scanner" id='top'>
          <div
            className="image-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={detailData?.image} alt="" style={{ width: '600px', height: `600px`, border: `1px solid #ddd` }} />
            {isHovered && (
              <div
                className="scanner-box"
                style={{
                  top: `${scannerPos.y}px`,
                  left: `${scannerPos.x}px`,
                  width: `150px`,
                  height: `150px`,
                }}
              />
            )}
            {isHovered && (
              <div
                className="view-box"
                style={{
                  backgroundImage: `url(${detailData?.image})`,
                  backgroundPosition: `-${scannerPos.x * 2}px -${scannerPos.y * 2}px`,
                  backgroundSize: `1200px 1200px`,
                }}
              />
            )}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className='text_category'>
            <span>Category</span>
            <span>{detailData?.category1}</span>
            <span>{detailData?.category2}</span>
            <span>{detailData?.category3}</span>
            <span>{detailData?.category4}</span>
          </div>
          <hr />
          <div className='text_title'>{detailData?.title?.replace(/<\/?b>/g, '').replace(/스테디에브리웨어/g, '').replace(/Steady Every Wear/g, '')}</div>
          <div className='text_price'>KRW {detailData?.lprice}</div>
          <hr />

          <div className="product-options">
            <div className="size-options">
              <p>SIZE</p>
              <div className="size-buttons">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className="color-options">
              <p>COLOR</p>
              <div className="color-buttons">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="">
            <hr />
            {selectedSize && selectedColor && (
              <div>
                <p>Selected Size: {selectedSize}</p>
                <p>Selected Color: {selectedColor}</p>
                <p>Price: KRW {detailData?.lprice}</p>
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange('decrease')}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange('increase')}>+</button>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div> <b>총 상품 금액 및 수량</b>: <b>KRW {pageTotalPrice}</b> ({quantity}개)</div>

          <div className="button-group">
            <button className="add-to-cart" onClick={handleAddToCart}>ADD TO CART</button>

            <button className="buy-now">BUY NOW</button>

            <button className="wish-list">❤️ WISH LIST</button>
          </div>

          <div>
            <DropdownBox
              title="제품 소재 정보"
              content="여기에 제품 소재 정보를 입력하세요."
            />
            <DropdownBox
              title="사이즈"
              content="여기에 사이즈 정보를 입력하세요."
            />
            <DropdownBox
              title="교환 및 반품"
              content="여기에 교환 및 반품 정보를 입력하세요."
            />
          </div>
        </Col>
      </Row>

      <Row>
        <div className="tab-container">
          <div
            className={`tab ${activeTab === 'detail' ? 'active' : ''}`}
            onClick={() => handleTabClick('detail')}
          >
            DETAIL
          </div>
          <div
            className={`tab ${activeTab === 'review' ? 'active' : ''}`}
            onClick={() => handleTabClick('review')}
          >
            REVIEW
          </div>
          <div
            className={`tab ${activeTab === 'qa' ? 'active' : ''}`}
            onClick={() => handleTabClick('qa')}
          >
            Q&A
          </div>
        </div>
      </Row>

      <Row id="detail" className="section">
        <hr />
        DETAIL
        <img src={detailData?.image} alt="" style={{ width: '600px', height: `600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height: `600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height: `600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height: `600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height: `600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height: `600px`, border: `1px solid #ddd` }} />
        <hr />
      </Row>

      <Row id="review" className="section">
        <hr />
        <h2>REVIEW</h2>
        <hr />
        <div className="review-item">
          <h4>홍길동</h4>
          <div style={{ display: 'flex' }}>
            <h4>⭐ 5.0</h4>
            <p style={{ marginLeft: '10px', marginTop: '4px' }}>2024. 8. 11.</p>
          </div>
          <p>이 제품 정말 많이 애용해요!!!</p>
          <Button variant="secondary">
            수정
          </Button>
          <Button variant="danger">
            삭제
          </Button>
          <hr />
        </div>
        <div className="review-item">
          <h4>강전하</h4>
          <div style={{ display: 'flex' }}>
            <h4>⭐ 1.0</h4>
            <p style={{ marginLeft: '10px', marginTop: '4px' }}>2024. 8. 24.</p>
          </div>
          <p>별 1점도 아깝습니다...</p>
          <Button variant="secondary">
            수정
          </Button>
          <Button variant="danger">
            삭제
          </Button>
          <hr />
        </div>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <h4>{review.name}</h4>
              <div style={{ display: 'flex' }}>
                <h4>⭐ {review.rating}.0</h4>
                <p style={{ marginLeft: '10px', marginTop: '4px' }}>{review.date}</p>
              </div>
              <p>{review.text}</p>
              <Button variant="secondary" onClick={() => handleEditReview(index)}>
                수정
              </Button>
              <Button variant="danger" onClick={() => handleDeleteReview(index)}>
                삭제
              </Button>
              <hr />
            </div>
          ))
        ) : (
          <p></p>
        )}
        <Button variant="white" onClick={handleShowReviewModal} style={{ borderColor: 'gray' }}>리뷰 작성</Button>

      </Row>

      <Row id="qa" className="section">
        <hr />
        <h2>Q&A</h2>
        <hr />
        <div>
          <div className="qna-item">
            <h6>상품상세문의</h6>
            <p>비공개 문의입니다.</p>
            <p>2024. 5. 23.</p>
            <Button variant="link" >
              열람
            </Button>
            <Button variant="secondary">
              수정
            </Button>
            <Button variant="danger">
              삭제
            </Button>
            <Button variant="warning">
              공개로 전환
            </Button>
            <hr />
          </div>
          {/* Q&A 섹션 */}

          {qnas.length > 0 ? (
            qnas.map((qna, index) => (
              <div key={index} className="qna-item">
                <h6>상품상세문의</h6>

                {qna.isPrivate ? (
                  <p>비공개 문의입니다.</p>
                ) : (
                  selectedQnaIndex === index && <p>{qna.text}</p>
                )}
                <p>{qna.date}</p>
                <Button variant="link" onClick={() => handleSelectQna(index)}>
                  {selectedQnaIndex === index ? '닫기' : '열람'}
                </Button>
                <Button variant="secondary" onClick={() => handleEditQna(index)}>
                  수정
                </Button>
                <Button variant="danger" onClick={() => handleDeleteQna(index)}>
                  삭제
                </Button>
                <Button variant="warning" onClick={() => handleToggleVisibility(index)}>
                  {qna.isPrivate ? '공개로 전환' : '비공개로 전환'}
                </Button>
                <hr />
              </div>
            ))
          ) : (
            <p></p>
          )}

          {/* Q&A 작성 모달 */}
          <Modal show={showQnaModal} onHide={handleCloseQnaModal}>
            <Modal.Header closeButton>
              <Modal.Title>{editIndex !== null ? '문의 수정' : '문의 작성'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddQna}>
                <Form.Group controlId="qnaText">
                  <Form.Label>문의 내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={qnaText}
                    onChange={(e) => setQnaText(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="isPrivate">
                  <Form.Check
                    type="checkbox"
                    label="비공개"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  {editIndex !== null ? '문의 수정' : '문의 작성'}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <Button variant="white" onClick={handleShowQnaModal} style={{ borderColor: 'gray' }}>
          문의 작성
        </Button>
      </Row>

      {/* 모달 컴포넌트 */}
      < Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>장바구니 담기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>(총 {quantity}개)</p>
          <img src={detailData?.image} alt="" style={{ width: '100px', height: `100px`, marginBottom: '10px' }} />
          <div><strong>{detailData?.title}</strong></div>
          <div style={{ color: 'gray' }}>[옵션: {selectedColor}/{selectedSize}]</div>
          <div>가격: KRW {pageTotalPrice}</div>
          <div>수량: {quantity}</div>
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
        <Modal.Footer>
          <Button variant="primary">
            <Link to={'/userpage/MyCart'} style={{ color: 'white', textDecoration: 'none' }}>장바구니로 이동</Link>
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            계속 쇼핑하기
          </Button>
          <Button variant="success" onClick={handleShowPaymentModal}>
            바로 구매하기
          </Button>

        </Modal.Footer>
      </Modal>

      {/* 리뷰 작성 모달 */}
      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? '리뷰 수정' : '리뷰 작성'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddReview}>
            <Form.Group controlId="reviewText">
              <Form.Label>리뷰 내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>별점</Form.Label>
              <Form.Control
                as="select"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                required
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Below Average</option>
                <option value="1">1 - Poor</option>
              </Form.Control>
            </Form.Group>
            <Button variant="dark" type="submit">
              {editIndex !== null ? '리뷰 수정' : '리뷰 작성'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* 결제 모달 */}
      <ModalPayment
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
        totalPrice={pageTotalPrice}
      />
    </Container>
  );
};

export default ItemDetailPage;
