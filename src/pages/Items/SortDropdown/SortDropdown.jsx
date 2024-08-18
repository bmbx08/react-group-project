import React from "react";
import { Dropdown } from "react-bootstrap";

const SortDropdown = () => {

    const sort=()=>{
        console.log("click");
    }

  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        정렬
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={sort}>정확도</Dropdown.Item>
        <Dropdown.Item onClick={sort}>최신</Dropdown.Item>
        <Dropdown.Item onClick={sort}>가격↑</Dropdown.Item>
        <Dropdown.Item onClick={sort}>가격↓</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
