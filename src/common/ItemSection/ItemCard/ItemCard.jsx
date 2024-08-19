import React from "react";
import "./ItemCard.style.css";

const ItemCard = ({item}) => {
  console.log(item);
  return (
    <div 
    // style={{
    //   backgroundImage:
    //     "url(" +
    //     `${item.image}` +
    //     ")",
    // }}
    className="item-card">
      <img
        src={`${item.image}`}
        width="200"
        height="200"
        className="item-img"
      />
      <div>{item.title}</div>
    </div>
  );
};

export default ItemCard;
