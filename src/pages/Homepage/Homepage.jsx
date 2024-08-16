import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useData } from "../../hooks/useData";
import Banner from "./Banner/Banner";
import ItemCard from "./ItemCard/ItemCard";

const Homepage = () => {
  // const { data, isLoading, isError, error } = useData();
  // console.log("data", data, isLoading);
  // console.log("error", isError, error);

  // useQuery({});

  return (
    <div>
      {/* <div>Homepage</div>
      <div className="d-flex">
        {data?.items?.map((item,index) => (
          <div className="item-card" key={index}>
            <img width="200" src={`${item.image}`} />
            <div>{item.title}</div>
          </div>
        ))}
      </div> */}
      <Banner />
      <ItemCard />
    </div>
  );
};

export default Homepage;
