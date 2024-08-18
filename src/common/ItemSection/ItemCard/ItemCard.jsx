import React from "react";
import "./ItemCard.style.css";

const ItemCard = ({data}) => {
  console.log(data?.items);
  return (
    <div className="d-flex flex-wrap">
      {data?.items?.map((item, index) => (
        <div className="item-card" key={index}>
          <img width="200" src={`${item.image}`} />
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
