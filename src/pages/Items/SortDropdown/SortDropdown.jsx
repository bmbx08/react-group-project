import React from "react";
import {Dropdown} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SortDropdown = () => {
  const navigate=useNavigate();
  let category=useSelector((state)=>state.category)

  const sortByCategory = (event) => {
    console.log(category);
    if (event.target.innerText === "정확도") {
      navigate(`/items/?category=${category}&sort_method=sim`);
    } else if (event.target.innerText === "최신") {
      navigate(`/items/?category=${category}&sort_method=date`);
    } else if (event.target.innerText === "가격↑") {
      navigate(`/items/?category=${category}&sort_method=asc`);
    } else if (event.target.innerText === "가격↓") {
      navigate(`/items/?category=${category}&sort_method=dsc`);
    }
  };
  //정확도, 최신,가격↑,가격↓

  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        정렬
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={(event) => sortByCategory(event)}>
          정확도
        </Dropdown.Item>
        <Dropdown.Item onClick={(event) => sortByCategory(event)}>
          최신
        </Dropdown.Item>
        <Dropdown.Item onClick={(event) => sortByCategory(event)}>
          가격↑
        </Dropdown.Item>
        <Dropdown.Item onClick={(event) => sortByCategory(event)}>
          가격↓
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
