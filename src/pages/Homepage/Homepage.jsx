import React from "react";
import {useData} from "../../hooks/useData";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner/Banner";
import ItemSection from "../../common/ItemSection/ItemSection"
import "./Homepage.style.css";

const Homepage = () => {
  const {data, isLoading, isError, error} = useData();
  const navigate = useNavigate();
  console.log("data", data, isLoading);
  console.log("error", isError, error);

  const showProduct = (index) => {
    navigate(`/items/${index}`)
  }
  return (
    <div>
      {/* <div className="d-flex">
        {data?.items?.map((item,index) => (
          <div className="item-card" key={index} onClick={()=>showProduct(index)} >
            <img width="200" src={`${item.image}`} alt=''/>
            <div>{item.title}</div>
          </div>
        ))}
      </div> */}
      <Banner />
      <ItemSection data={data} showProduct={showProduct}/>
    </div>
  );
};

export default Homepage;
