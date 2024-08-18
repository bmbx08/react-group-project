import React from "react";
import {useData} from "../../hooks/useData";
import ItemSection from "../../common/ItemSection/ItemSection"
import "./Homepage.style.css";

const Homepage = () => {
  const {data, isLoading, isError, error} = useData();
  console.log("data", data, isLoading);
  console.log("error", isError, error);

  return (
    <div>
      <div>Homepage</div>
      <div className="asdf">
        {data?.items?.map((item, index) => (
          <div className="item-card" key={index}>
            <img width="200" src={`${item.image}`} />
            <div>{item.title}</div>
          </div>
        ))}
      </div>

      <ItemSection data={data}/>
    </div>
  );
};

export default Homepage;
