import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDetail } from '../../hooks/useDetail';
import { Col, Container, Row } from 'react-bootstrap';
import './ItemDetailPage.style.css';
import DropdownBox from './DropdownBox';



const ItemDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useDetail();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  const [scannerPos, setScannerPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('detail');

  const sizes = ['S', 'M', 'L'];
  const colors = ['blue', 'green', 'pink', 'gray', 'yellow'];

  if (isLoading) {
    return <h1> Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const detailData = data?.items[id];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.getElementById(tab).scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const scannerSize = 150; // Scanner 박스의 크기
    const x = Math.max(Math.min(offsetX, offsetWidth - scannerSize / 2), scannerSize / 2);
    const y = Math.max(Math.min(offsetY, offsetHeight - scannerSize / 2), scannerSize / 2);

    setScannerPos({ x: x - scannerSize / 2, y: y - scannerSize / 2 });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  
  return (
    <Container>
      <Row>
        <Col xs={12} md={6} className="Scanner">
          <div
            className="image-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
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
                  backgroundSize: `1200px 1200px`, // 이미지 확대 배율
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
                    onClick={() => setSelectedSize(size)}
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
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
          <hr/>
          <div> <b>총 상품 금액 및 수량</b> : <b>$ 119000</b>(1개)</div>
          <div className="button-group">
            <button className="add-to-cart">ADD TO CART</button>
            <button className="buy-now">BUY NOW</button>
            <button className="wish-list">WISH LIST</button>
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
          <div></div>
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
        <hr/>
        DETAIL
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />

      </Row>
      <Row id="review" className="section">
        <hr/>
        REVIEW,
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
      </Row>
      <Row id="qa" className="section">
        <hr/>
        Q&A
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />
        <img src={detailData?.image} alt="" style={{ width: '600px', height:`600px`, border: `1px solid #ddd` }} />

      </Row>
    </Container>
  );
};

export default ItemDetailPage;
