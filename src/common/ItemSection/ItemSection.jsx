import React from "react";
import {Col, Row} from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import ItemCard from "./ItemCard/ItemCard";
import {useData} from "../../hooks/useData"

const ItemSection = ({data}) => {
  return (
    <Row>
      <Col lg={3}>
        <Sidebar />
      </Col>
      <Col lg={9}>
        <ItemCard data={data} />
      </Col>
    </Row>
  );
};

export default ItemSection;
