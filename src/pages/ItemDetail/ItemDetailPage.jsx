import {React, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDetail} from "../../hooks/useDetail";
import {Col, Container, Row, Modal, Button} from "react-bootstrap";
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
  const [scannerPos, setScannerPos] = useState({x: 0, y: 0});
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("detail");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [favorite, setFavorite] = useState(false);

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

  return (
    <Container>
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
          <div className="text_title">
            {detailData?.title
              ?.replace(/<\/?b>/g, "")
              .replace(/스테디에브리웨어/g, "")
              .replace(/Steady Every Wear/g, "")}
          </div>
          <div className="text_price">KRW {detailData?.lprice}</div>
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

            <button className="buy-now">BUY NOW</button>
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
        <hr />
        DETAIL
        <img
          src={detailData?.image}
          alt=""
          style={{width: "600px", height: `600px`, border: `1px solid #ddd`}}
        />
        <img
          src={detailData?.image}
          alt=""
          style={{width: "600px", height: `600px`, border: `1px solid #ddd`}}
        />
        <img
          src={detailData?.image}
          alt=""
          style={{width: "600px", height: `600px`, border: `1px solid #ddd`}}
        />
        <img
          src={detailData?.image}
          alt=""
          style={{width: "600px", height: `600px`, border: `1px solid #ddd`}}
        />
        <img
          src={detailData?.image}
          alt=""
          style={{width: "600px", height: `600px`, border: `1px solid #ddd`}}
        />
        <img
          src={detailData?.image}
          alt=""
          style={{width: "600px", height: `600px`, border: `1px solid #ddd`}}
        />
        <hr />
      </Row>

      <Row id="review" className="section">
        <hr />
        REVIEW
        <hr />
      </Row>

      <Row id="qa" className="section">
        <hr />
        Q&A
        <hr />
      </Row>

      {/* 모달 컴포넌트 */}
      <Modal show={showModal} onHide={handleCloseModal}>
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
              to={"/userpage/MyCart"}
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
