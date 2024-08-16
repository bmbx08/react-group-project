import React from "react";
import {useData} from "../../hooks/useData";
import { useNavigate } from "react-router-dom";

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
      <div>Homepage</div>
      <div className="d-flex" >
        {data?.items?.map((item,index) => (
          <div className="item-card" key={index} onClick={()=>showProduct(index)} >
            <img width="200" src={`${item.image}`} alt=''/>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
