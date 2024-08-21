import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchData = (sort_method) => {
    // if(sort_method)
    //   return api.get(`/shop.json?display=100&query=steadyeverywear&sort=${sort_method}`);
    // else
      return api.get('/shop.json?display=100&query=steadyeverywear');
  };
  
  export const useData = (sort_method) => {
    return useQuery({
      queryKey: ["product-data",sort_method],
      queryFn: ()=>fetchData(sort_method),
      select:(result)=>result.data
    });
  };