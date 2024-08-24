import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import SortDropdown from "../SortDropdown/SortDropdown";
import "./TopBar.style.css";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";

const TopBar = ({data}) => {
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const searchByKeyword = (event) => {
    event.preventDefault();
    dispatch({type:"STORE_KEYWORD",payload:{keyword}})
    dispatch({type:"RESET_CURRENT_CATEGORY"})
    navigate(`/items?q=${keyword}`);
  };

  return (
    <div className="sort-section">
      <Row>
        <Col lg={8}>
          <div className="total-items">
            Showing: <strong>{data?.items.length}</strong> items
          </div>
        </Col>
        <Col lg={3}>
          <Form onSubmit={searchByKeyword}>
            <Form.Control
              type="search"
              placeholder="상품 입력.."
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </Form>
        </Col>
        <Col lg={1}>
          <SortDropdown />
        </Col>
      </Row>
    </div>
  );
};

export default TopBar;
