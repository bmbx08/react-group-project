import React from "react";
import emptyHeart from "../../images/item-card/emptyheart3.png";
import fullHeart from "../../images/item-card/fullheart.png";
import cart from "../../images/item-card/cart.png";
import magnify from "../../images/item-card/magnify.png"
import "./ItemCard.style.css";

const ItemCard = ({item,index,showProduct}) => {
  console.log(index);
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
    
    item.lprice=item?.lprice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div
      // style={{
      //   backgroundImage:
      //     "url(" +
      //     `${item.image}` +
      //     ")",
      // }}
      className="item-card"
      onClick={()=>showProduct(index)}
    >
      <div className="img-container">
        <img
          src={`${item?.image}`}
          width="200"
          height="200"
          className="item-img"
        />
      </div>
      <div>
        <img src={emptyHeart} width="15" height="15" className="item-icon"/>
        {/* <img src={fullHeart} width="15" height="15" /> */}
        <img src={cart} width="18" height="16" className="item-icon"/>
        <img src={magnify} width="15" height="15" className="item-icon"/>
      </div>

      <div>{item?.title}</div>
      <div className="item-price">{item?.lprice}</div>
    </div>
  );
};

export default ItemCard;
