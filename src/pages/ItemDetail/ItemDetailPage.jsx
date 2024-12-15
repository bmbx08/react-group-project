import {React, useState,useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDetail} from "../../hooks/useDetail";
import {Col, Container, Row, Modal, Button,Form} from "react-bootstrap";
import "./ItemDetailPage.style.css";
import DropdownBox from "./DropdownBox";
import {useDispatch} from "react-redux";
import ReactPaginate from "react-paginate";
import ModalPayment from "../component/Modal/ModalPayment";

const ItemDetailPage = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {data, isLoading, isError, error} = useDetail();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pageTotalPrice, setPageTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [scannerPos, setScannerPos] = useState({x: 0, y: 0});
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("detail");
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
  const [favorite, setFavorite] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  console.log(storedUser)

  // 로그인된 유저 정보 (예시)
  const loggedInUser = {
    name: storedUser?.name || 'Guest', // storedUser가 존재하면 name을 가져오고, 없으면 기본값 'Guest'
  };

  const sizes = ["S", "M", "L"];
  const colors = ["blue", "green", "pink", "gray", "yellow"];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

const detailData = data?.items.find((item) => {
  return item.productId == id;
});
  const detailTitle = detailData?.title?.replace(/[\[\]']+/g, "")
    .replace(/[()]/g, "")
    .replace(/<b>/g, "")
    .replace(/<\/b>/g, "")
    .replace(/,/g, "")
    .replace(/steadyeverywear/g, "")
    .replace(/Steady Every Wear/g, "")
    .replace(/STEADY EVERY WEAR/g, "")
    .replace(/STEADYEVERYWEAR/g, "")
    .replace(/Steady Every wear/g, "")
    .replace(/Steady Everywear/g, "")
    .replace(/재입고/g, "")
    
    .replace("A-2", "")
    .replace(/맨투맨 2/g, "Daily Long-sleeved Sweatshirt")
    .replace(/하프 슬리브드 바스크/g, "Half-Sleeved Basque")
    .replace(/레귤러 스트레이트 데님 팬츠/g, "Regular Straight Denim Pants")
    .replace(/블랙/g, "Black")
    .replace(/크림/g, "Cream")
    .replace(/카키/g, "Khaki")
    .replace(/코튼 브이넥 베스트/g, "Cotton V-neck Vest")
    .replace(/릴렉스드 데일리 셔츠/g, "Relaxed Daily Dress Shirt")
    .replace(/솔리드 바스크 셔츠/g, "Solid Basque Shirt")
    .replace(/데일리 후디/g, "Daily Hoody")
    .replace(/멜란지/g, "Melange")
    .replace(/화이트/g, "White")
    .replace(/라이트 그린/g, "Light Green")

    .replace(/[가-힣]/g, "") //모든 한글 제거
    
    .toLowerCase() //모든 철자 소문자화 후
    .replace(/\b\w/g, (match) => match.toUpperCase()); //각 단어의 첫 철자만 대문자화 

  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.getElementById(tab).scrollIntoView({behavior: "smooth"});
  };

  const handleMouseMove = (e) => {
    const {offsetX, offsetY, target} = e.nativeEvent;
    const {offsetWidth, offsetHeight} = target;
    const scannerSize = 150;
    const x = Math.max(
      Math.min(offsetX, offsetWidth - scannerSize / 2),
      scannerSize / 2
    );
    const y = Math.max(
      Math.min(offsetY, offsetHeight - scannerSize / 2),
      scannerSize / 2
    );

    setScannerPos({x: x - scannerSize / 2, y: y - scannerSize / 2});
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
        type: "ADD_CART",
        payload: {
          name: detailTitle,
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

  const storeFavorite = () => {
    setFavorite(true);
    dispatch({type: "STORE_FAVORITE", payload: {item: detailData}});
    alert(`${detailData?.title}has been added to wish list!`);
  };

  const deleteFavorite=()=>{
    setFavorite(false);
    dispatch({type: "DELETE_FAVORITE",payload:{item:detailData}});
    alert(`${detailData?.title}has been removed from wish list!`)
  }

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
      updateTotalPrice(quantity + 1, detailData?.lprice);
    } else if (type === "decrease") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
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
    <Container className="detail-page">
      <Row>
        <Col xs={12} md={6} className="Scanner" id="top">
          <div
            className="image-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={detailData?.image}
              alt=""
              style={{
                width: "600px",
                height: `600px`,
                border: `1px solid #ddd`,
              }}
            />
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
                  backgroundPosition: `-${scannerPos.x * 2}px -${
                    scannerPos.y * 2
                  }px`,
                  backgroundSize: `1200px 1200px`,
                }}
              />
            )}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="text_category">
            <span>Category</span>
            <span>{detailData?.category1}</span>
            <span>{detailData?.category2}</span>
            <span>{detailData?.category3}</span>
            <span>{detailData?.category4}</span>
          </div>
          <hr />
          <div className='text_title'>{detailTitle}</div>
          <div className='text_price'>KRW {detailData?.lprice}</div>
          <hr />

          <div className="product-options">
            <div className="size-options">
              <p>SIZE</p>
              <div className="size-buttons">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`size-button ${
                      selectedSize === size ? "selected" : ""
                    }`}
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
                    className={`color-circle ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    style={{backgroundColor: color}}
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
                  <button onClick={() => handleQuantityChange("decrease")}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange("increase")}>
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div>
            {" "}
            <b>총 상품 금액 및 수량</b>: <b>KRW {pageTotalPrice}</b> ({quantity}
            개)
          </div>

          <div className="button-group">
            <button className="add-to-cart" onClick={handleAddToCart}>
              ADD TO CART
            </button>

            <button className="buy-now" onClick={handleShowPaymentModal}>BUY NOW</button>
            {favorite ? (
              <button className="wish-list" onClick={deleteFavorite}>
                ❤️ DELETE WISH LIST
              </button>
            ) : (
              <button className="wish-list" onClick={storeFavorite}>
                ❤️ ADD WISH LIST
              </button>
            )}
          </div>

          <div>
  <DropdownBox
    title="제품 소재 정보"
    content={
      <>
        - 제품 소재 정보<br />
        겉감 : Polyester 100% (From - JAPAN)<br /><br />
        세탁방법<br />
        제품 원형 보존을 위해 손세탁 혹은 드라이클리닝을 권장합니다.
      </>
    }
  />
  <DropdownBox
  title="사이즈"
  content={
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', paddingBottom: '8px' }}></th>
          <th style={{ textAlign: 'center', paddingBottom: '8px' }}>S</th>
          <th style={{ textAlign: 'center', paddingBottom: '8px' }}>M</th>
          <th style={{ textAlign: 'center', paddingBottom: '8px' }}>L</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: 'right', padding: '4px 0' }}>총장</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>70</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>72</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>74</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'right', padding: '4px 0' }}>어깨단면</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>56</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>58</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>60</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'right', padding: '4px 0' }}>가슴단면</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>60</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>62</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>64</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'right', padding: '4px 0' }}>소매길이</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>22</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>24</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>26</td>
        </tr>
      </tbody>
    </table>
  }
/>

  <DropdownBox
    title="교환 및 반품"
    content={
      <>
        
        CJ대한통운 택배를 이용하고 있으며 배송비는 무료입니다.<br /><br />
        오후 2시 이전 주문 건에 한하여 당일 출고되며, 배송기간은 영업일 기준 1~3일 정도 소요됩니다. (단, 월요일이나 행사 기간 등 주문량이 많을 경우 배송이 지연될 수 있습니다.)<br /><br />
        반품은 상품 수령일로부터 7일 이내에 가능합니다.<br /><br />
        - 배송 정보 안내<br />
        1) 매일 오후 2시 이전까지 결제(입금)가 완료된 주문에 한하여 당일 출고가 진행됩니다. (주말 제외)<br /><br />
        2) 금요일 오후 2시 이후부터 다음 주 월요일 오후 2시까지의 결제가 완료된 주문은 월요일에 출고됩니다. (단, 월요일 출고량이 많을 경우 배송이 지연될 수 있습니다.)<br /><br />
        3) 발송된 제품은 보통 배송 완료일(제품이 발송된 날)로부터 평균 2~3일 내에 고객님께 도착하며, 배송 시일은 운영진 쪽에서 조절할 수 없는 점 양해 부탁드립니다. (단, 제주도 및 도서지역은 추가 3일 이상 소요될 수 있습니다.)<br /><br />
        오후 2시 이전 주문 → 당일 출고<br /><br />
        오후 2시 이후 주문 → 익일 출고<br /><br />
        ※ 간혹 회사 사정으로 인하여 부득이하게 발송 시점이 달라질 수 있으니 이 점 양해 부탁드립니다.<br /><br />
        ※ 운송장 번호는 오후 5~6시경 일괄적으로 입력되고 있으나, 배송량에 따라 입력 시간은 다소 차이가 있을 수 있습니다.<br /><br />
        - 교환 및 반품 정책<br />
        Skrrr wear는 규정 내에서의 교환 및 환불에 대해 최대한 고객님의 입장에서 처리하기 위해 노력하고 있습니다.<br /><br />
        하지만, 일부 재판매가 어려울 정도로 훼손된 제품의 교환이나 환불 요청이 있어 아래와 같이 교환/반품이 불가능한 경우를 공지합니다.<br /><br />
        # 교환/반품 불가 사유<br /><br />
        - 양말, 오염이 쉽게 발생하는 흰색 의류가 오염되었을 경우<br /><br />
        - 시착으로 인한 신발의 바닥 오염, 주름이 발생한 경우<br /><br />
        - 코트의 뒤트임과 주머니에 가봉 처리된 실을 제거하거나 팔 부분 주름이 발생한 경우<br /><br />
        - 기타 재판매가 불가할 정도로 상품이 훼손된 경우 (늘어남, 오염, 가죽의 주름 등)<br /><br />
        - 향수나 화장품, 땀, 담배 냄새가 배어있는 경우<br /><br />
        - 세탁을 하거나 임의로 수선한 경우<br /><br />
        - 하자 상품의 경우에도 교환/환불 불가<br /><br />
        - 택을 분실하거나 제거한 경우<br /><br />
        위 경우에 해당되는 상품을 임의로 발송 시 모든 배송비는 고객님 부담이며, 상품은 재발송 처리되오니 양해 부탁드립니다.<br /><br />
        ■ 무료 반품 서비스<br /><br />
        사이즈 선택이 어려우신가요?<br /><br />
        고민 중인 두 사이즈를 구매하신 후 맞지 않는 사이즈는 반품하세요.<br /><br />
        부분 반품 시 반품 배송비는 무료입니다.<br /><br />
        해당 서비스는 공식 온라인 스토어 주문 건에 한합니다.<br /><br />
        ※ 무료반품 서비스 예외 사항 (반품비 부과)<br /><br />
        · 무신사 스토어 주문 건<br /><br />
        · 두 사이즈 모두 반품할 경우<br /><br />
        · 두 상품을 따로 받아보셨을 경우<br /><br />
        · CJ대한통운을 이용하지 않은 경우 (ex. 편의점 택배 등)<br /><br />
        · SALE 제품 등 따로 공지된 경우 (ex. SALE 카테고리 상품)
      </>
    }
  />
</div>


        </Col>
      </Row>

      <Row>
        <div className="tab-container">
          <div
            className={`tab ${activeTab === "detail" ? "active" : ""}`}
            onClick={() => handleTabClick("detail")}
          >
            DETAIL
          </div>
          <div
            className={`tab ${activeTab === "review" ? "active" : ""}`}
            onClick={() => handleTabClick("review")}
          >
            REVIEW
          </div>
          <div
            className={`tab ${activeTab === "qa" ? "active" : ""}`}
            onClick={() => handleTabClick("qa")}
          >
            Q&A
          </div>
        </div>
      </Row>

      <Row id="detail" className="section">
  <p style={{ fontWeight: 'bold' }}>
    이 제품은 기본에 충실한 디자인과 품질을 자랑합니다. 깔끔한 라인과 세심한 마감 처리로 일상에서 편안하게 착용할 수 있으며, 
    고급스러운 소재와 탄탄한 내구성으로 오랜 기간 사용할 수 있는 아이템입니다.
  </p>
  <img src={detailData?.image} alt="" style={{ width: '600px', height: '600px', border: '1px solid #ddd' }} />
  <img src={detailData?.image} alt="" style={{ width: '600px', height: '600px', border: '1px solid #ddd' }} />
  
  <div style={{ textAlign: 'center' }}>
  - 사이즈
    <table style={{ borderCollapse: 'collapse', margin: '0 auto' , width: `500px`}}>
      <thead>
        <tr>
          <th style={{ paddingBottom: '8px' }}></th>
          <th style={{ textAlign: 'center', paddingBottom: '8px' }}>S</th>
          <th style={{ textAlign: 'center', paddingBottom: '8px' }}>M</th>
          <th style={{ textAlign: 'center', paddingBottom: '8px' }}>L</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>총장</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>70</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>72</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>74</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>어깨단면</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>56</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>58</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>60</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>가슴단면</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>60</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>62</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>64</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>소매길이</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>22</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>24</td>
          <td style={{ textAlign: 'center', padding: '4px 0' }}>26</td>
        </tr>
      </tbody>
    </table>
  </div>

  <img src="https://m.wondandaejang.kr/web/product/extra/big/202307/3b707d258a6976a33a3b84403c8094ff.jpg" 
      alt="product image" 
      style={{ width: '100%', height: '600px', border: '1px solid #ddd' }} 
  />
  
  <p>
    - 제품 소재 정보<br />
    겉감 : Polyester 100% (From - JAPAN)<br /><br />
    세탁방법<br />
    제품 원형 보존을 위해 손세탁 혹은 드라이클리닝을 권장합니다.
  </p>
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
          <img
            src={detailData?.image}
            alt=""
            style={{width: "100px", height: `100px`, marginBottom: "10px"}}
          />
          <div>
            <strong>{detailData?.title}</strong>
          </div>
          <div style={{color: "gray"}}>
            [옵션: {selectedColor}/{selectedSize}]
          </div>
          <div>가격: KRW {pageTotalPrice}</div>
          <div>수량: {quantity}</div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            <Link
              to={"/userpage/Mycart"}
              style={{color: "white", textDecoration: "none"}}
            >
              장바구니로 이동
            </Link>
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
