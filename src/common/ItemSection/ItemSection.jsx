import React from "react";
import {Col, Row} from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import ItemCard from "./ItemCard/ItemCard";
import "./ItemSection.style.css";
import { useSelector } from "react-redux";

const ItemSection = ({data}) => {
  if (data) {
    data?.items.map((item) => {
      item.title = item?.title //제목에서 문구 제거
        .replace(/[\[\]']+/g, "")
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

      item.lprice = item?.lprice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
  }

  return (
    <Row>
      <Col lg={3}>
        <Sidebar />
      </Col>
      <Col lg={9}>
        <Row className="padding-right">
          {data?.items.map((item, index) => (
            <Col lg={3} sm={12}>
              <ItemCard item={item} key={index} index={index} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ItemSection;
