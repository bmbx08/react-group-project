import React from "react";
import {Col, Row} from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import ItemCard from "./ItemCard/ItemCard";
import "./ItemSection.style.css"

const ItemSection = ({data,showProduct}) => {
  
  return (
    <Row>
      <Col lg={3}>
        <Sidebar />
      </Col>
      <Col lg={9}>
        <Row className="padding-right">
          {data?.items.map((item, index) => (
            <Col lg={3} sm={12}>
              <ItemCard item={item} index={index} showProduct={showProduct} data={data} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ItemSection;
