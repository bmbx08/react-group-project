import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import fullHeart from "../../../../common/images/item-card/fullheart.png";
import "./ItemRow.style.css";
import { useDispatch } from "react-redux";

const ItemRow = ({item}) => {
    const dispatch=useDispatch();

    const deleteFavorite=()=>{
        dispatch({type: "DELETE_FAVORITE", payload: {item}});
    }
  return (
    <Row className="item-row">
      <Col lg={1} className="item-column">
        <img src={fullHeart} width="15" height="15" />
      </Col>
      <Col lg={2} className="item-column">
        <img src={item?.image} className="favorite-image" />
      </Col>
      <Col lg={5} className="item-column item-title">
        <div>{item?.title}</div>
      </Col>
      <Col lg={2} className="item-column">
        <div className="favorite-item-price">{item?.lprice}</div>
      </Col>
      <Col lg={2} className="item-column favorite-order-section">
          <Button variant="secondary" className="favorite-order-button">Add to Cart</Button>
          <Button variant="outline-secondary" className="favorite-order-button" onClick={deleteFavorite}>Delete Item</Button>
      </Col>
    </Row>
  );
};

export default ItemRow;
