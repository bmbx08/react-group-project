import React, { useState } from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import "./Sidebar.style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const categoryList = ["모두","남성","여성","상의","바지","아우터","트레이닝복"];
  const topCategoryList = ["셔츠/남방", "니트/스웨터", "티셔츠", "조끼"];
  const outerwearCategoryList = ["레인코트", "코트", "점퍼", "카디건"];

  const [topDisplay,toggleTopDisplay]=useState(false);
  const [outerDisplay,toggleOuterDisplay]=useState(false);
  const navigate = useNavigate();
  const dispatch= useDispatch();

  //category를 누르면
  //1. /items/category=${event.target.innerHTMl}로 이동
  //2. DetailPage에서 쿼리값 불러오기
  //3. apicall 호출 후 data값들에서 쿼리값을 포함한 category가 있으면 data에 재삽입

  const getCategoryItems=(event)=>{ 
      navigate(`/items/?category=${event.target.innerHTML}`);
      dispatch({type:"STORE_CURRENT_CATEGORY", payload: {category:event.target.innerHTML} })
      dispatch({type:"RESET_KEYWORD"})
      
  }

  return (
    <div className="sidebar">
      <div className="sidebar-title">Products</div>
      <ul className="list-padding">
        {categoryList.map((categ,index) => {
          if (categ === "상의") {
            return (
              <>
                <li key={index} className="no-dot sidebar-item" onClick={()=>toggleTopDisplay(!topDisplay)}>{categ}▼</li>
                <ul className={`list-padding toggle-section ${topDisplay}`}>
                  {topCategoryList.map((topCateg,index) => (
                    <li className="no-dot sidebar-subitem category-click" key={index} onClick={(event)=>getCategoryItems(event)}>{topCateg}</li>
                  ))}
                </ul>
              </>
            );
          }
          if (categ === "아우터") {
            return (
              <>
                <li key={index} className="no-dot sidebar-item" onClick={()=>toggleOuterDisplay(!outerDisplay)}>{categ}▼</li>
                <ul className={`list-padding toggle-section ${outerDisplay}`}>
                  {outerwearCategoryList.map((outerCateg,index) => (
                    <li className="no-dot sidebar-subitem category-click" key={index} onClick={(event)=>getCategoryItems(event)}>{outerCateg}</li>
                  ))}
                </ul>
              </>
            );
          } else {
            return <li key={index} className="no-dot sidebar-item category-click" onClick={(event)=>getCategoryItems(event)}>{categ}</li>;
          }
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
