import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchData = () => {
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  console.log(PROXY);
  const URL = `${PROXY}/v1/search/shop.json?q=steadyeverywear`; // .toml file doesnt change /proxy to https://openapi~~
  console.log(URL);

    return api.get(URL);
  };
  
  export const useData = () => {
    return useQuery({
      queryKey: ["product-data"],
      queryFn: fetchData,
      select:(result)=>result.data
    });
  };