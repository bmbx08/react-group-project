import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import fullHeart from "../../../common/images/item-card/fullheart.png";
import "./MyFavoritesPage.style.css";
import ItemRow from "./component/ItemRow";

const MyFavoritesPage = () => {
  //1.좋아요를 누르면 item 객체를 store에 전달
  //1-2. 담으면 빨간색 하트, 없애면 빈 하트로 변경
  //1-3.
  //store에서 같은 productid 가진 item 객체 없으면 favoriteslist에 객체 추가
  //favorites page에서 favoriteslist 정보 불러와서 페이지에 .map으로 보여줌

  const [itemList, setItemList] = useState([]);

  const favoritesList = useSelector((state) => state.FavoritesList);
  console.log(favoritesList);

  useEffect(() => {
    setItemList(favoritesList);
  }, [favoritesList]);

  return (
    <div className="favorites-section">
      <div className="favorites-section-title">My Favorites</div>
      <Row className="title-row">
        <Col lg={1} className="table-title">
          <div>Likes</div>
        </Col>
        <Col lg={2} className="table-title">
          <div>Image</div>
        </Col>
        <Col lg={5} className="table-title">
          <div>Product Name</div>
        </Col>
        <Col lg={2} className="table-title">
          <div>Price</div>
        </Col>
        <Col lg={2} className="table-title">
          <div>Order</div>
        </Col>
      </Row>
      <Row className="title-bottom-border">
      </Row>
      {itemList.map((item, index) => (
        <ItemRow key={index} item={item}/>
      ))}
    </div>
    //   <div
    //   // style={{
    //   //   backgroundImage:
    //   //     "url(" +
    //   //     `${item.image}` +
    //   //     ")",
    //   // }}
    //   className="item-card"
    //   onClick={() => showProduct(index)}
    // >
    //   <div className="img-container">
    //     <img
    //       src={`${item?.image}`}
    //       width="200"
    //       height="200"
    //       className="item-img"
    //     />
    //   </div>
    //   <div>
    //     {favorite == false ? (
    //       <img
    //         src={emptyHeart}
    //         width="15"
    //         height="15"
    //         className="item-icon"
    //         onClick={storeFavorite}
    //       />
    //     ) : (
    //       <img
    //         src={fullHeart}
    //         width="15"
    //         height="15"
    //         className="item-icon"
    //         onClick={deleteFavorite}
    //       />
    //     )}

    //     <img src={cart} width="18" height="16" className="item-icon" />
    //     <img src={magnify} width="15" height="15" className="item-icon" />
    //   </div>

    //   <div>{item?.title}</div>
    //   <div className="item-price">{item?.lprice}</div>
    // </div>
  );
};

export default MyFavoritesPage;
