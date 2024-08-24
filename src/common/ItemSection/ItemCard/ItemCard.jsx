import React, {useEffect, useState} from "react";
import emptyHeart from "../../images/item-card/emptyheart3.png";
import fullHeart from "../../images/item-card/fullheart.png";
import cart from "../../images/item-card/cart.png";
import magnify from "../../images/item-card/magnify.png";
import "./ItemCard.style.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

//data 안에 각 item을 favorite==false인 상태로 store에 저장
//Item section에서 store에서 data를 불러와 각 Item card마다 favorite(true/false) 값을 전달해줌
//Item card에서 그 favorite 값에 따라 fullheart/ emptyheart 출력

const ItemCard = ({item, index}) => {
  // console.log(item?.favorite);
  const [favorite, setFavorite] = useState(false);
  // const [itemObject, setItemObject] = useState(item);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesList = useSelector(state=>state.FavoritesList);

  const goToDetailPage = () => {
    navigate(`/items/${item.productId}`);
  };

  const storeFavorite = (event) => {
    event.stopPropagation(); //stops parent click event being recalled first
    // if (item.favorite) {
    console.log(item);
    dispatch({type: "STORE_FAVORITE", payload: {item}});
    setFavorite(true);
    // alert(`${item?.title}added to Favorites!`);  
    // setFavorite(false);
    // item.favorite=false;
    // setItemObject(prevState=>({
    //   ...prevState,
    //   favorite:false
    // }))
    // }
  };

  const deleteFavorite = (event) => {
    event.stopPropagation();
    // if(!item.favorite){
    console.log(item);
    dispatch({type: "DELETE_FAVORITE", payload: {item}});
    setFavorite(false);
    // setFavorite(true);
    // item.favorite=true;
    // setItemObject(prevState=>({
    //   ...prevState,
    //   favorite:true
    // }))
    // }
  };

  useEffect(()=>{
    if (favoritesList.some((favoriteItem)=>{
      return favoriteItem===item;
    })){
      console.log("favorite complete");
      setFavorite(true);
    }
  },[favoritesList])

  return (
    <div
      // style={{
      //   backgroundImage:
      //     "url(" +
      //     `${item.image}` +
      //     ")",
      // }}
      className="item-card"
      onClick={goToDetailPage}
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
        {favorite == false ? (
          <img
            src={emptyHeart}
            width="15"
            height="15"
            className="item-icon"
            onClick={storeFavorite}
          />
        ) : (
          <img
            src={fullHeart}
            width="15"
            height="15"
            className="item-icon"
            onClick={deleteFavorite}
          />
        )}

        <img src={cart} width="18" height="16" className="item-icon" />
        <img src={magnify} width="15" height="15" className="item-icon" />
      </div>

      <div>{item?.title}</div>
      <div className="item-price">{item?.lprice}</div>
    </div>
  );
};

export default ItemCard;
