import React, { useEffect, useState } from "react";
import { useHomeData } from "../../hooks/useHomeData";
import Banner from "./Banner/Banner";
import ItemSection from "../../common/ItemSection/ItemSection"
import "./Homepage.style.css";


const Homepage = () => {
  const displayAmount = 12;
  const {data, isLoading, isError, error} = useHomeData(displayAmount);
  console.log("data", data, isLoading);
  console.log("error", isError, error);

  return (
    <div className="homepage">
      {/* <div className="d-flex">
        {data?.items?.map((item,index) => (
          <div className="item-card" key={index} onClick={()=>showProduct(index)} >
            <img width="200" src={`${item.image}`} alt=''/>
            <div>{item.title}</div>
          </div>
        ))}
      </div> */}
      {/* <Alert show={showFavoriteAlert} variant="secondary" className="favorite-alert">
        <Alert.Heading>Favorite Item added!</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={closeAlert} variant="outline-secondary">
            Close
          </Button>
        </div>
      </Alert> */}
      
      
      <Banner />
      <ItemSection data={data} />
    </div>
  );
};

export default Homepage;