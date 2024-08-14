import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchData = () => {
    return api.get('/shop.json?query=steadyeverywear');
  };
  
  export const useData = () => {
    return useQuery({
      queryKey: ["product-data"],
      queryFn: fetchData,
      select:(result)=>result.data
    });
  };