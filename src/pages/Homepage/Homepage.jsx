import React from "react";
import {useData} from "../../hooks/useData";
import Banner from "./Banner/Banner";
import ItemSection from "../../common/ItemSection/ItemSection"
import "./Homepage.style.css";

const Homepage = () => {
  const {data, isLoading, isError, error} = useData();
  console.log("data", data, isLoading);
  console.log("error", isError, error);

  return (
    <div>
      <Banner />
      <ItemSection data={data}/>
    </div>
  );
};

export default Homepage;
