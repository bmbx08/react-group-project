import React from "react";
import {useSearchParams} from "react-router-dom";
import ItemSection from "../../common/ItemSection/ItemSection";
import {useData} from "../../hooks/useData";
import TopBar from "./TopBar/TopBar";

//category=모두이면 다시 api call
//남성/여성이면 category2 에서 남성의류/여성의류인 값들만 .map에 표시

const ItemsPage = () => {
  const [query, setQuery] = useSearchParams();
  const category = query.get("category");
  const sort_method = query.get("sort_method");
  const keyword = query.get("q");
  console.log("category", category);

  const {data, isLoading, isError, error} = useData(sort_method);
  console.log("data", data, isLoading);
  console.log("error", isError, error);

  if (data) {
    if (keyword !== null){
      data.items=data.items.filter((item)=>{
        item.title= item.title.toLowerCase();
        return item.title.includes(keyword);
      })
      console.log(data.items);
    }
    if (category !== null) {
      if (category === "모두") {
      } else if (category === "남성" || category === "여성") {
        data.items = data?.items.filter((item) => {
          return item.category2.includes(category);
        });
      } else {
        data.items = data?.items.filter((item) => {
          return item.category3 === category;
        });
      }
    }
  }

  return (
    <div>
      <TopBar data={data}/>
      <ItemSection data={data} />
    </div>
  );
};

export default ItemsPage;
