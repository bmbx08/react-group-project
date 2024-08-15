import React, { useState } from 'react';
import './DropdownBox.css';
const DropdownBox = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-box">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>{title}</span>
        <button className="dropdown-toggle">{isOpen ? '-' : '+'}</button>
      </div>
      {isOpen && <div className="dropdown-content">{content}</div>}
    </div>
  );
}

export default DropdownBox
