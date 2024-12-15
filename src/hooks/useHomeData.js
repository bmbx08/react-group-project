import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchData = (displayAmount) => {
      return api.get(`/shop.json?display=${displayAmount}&query=steadyeverywear`);
  };
  
  export const useHomeData = (displayAmount) => {
    return useQuery({
      queryKey: ["product-data",{"displayAmount":displayAmount}],
      queryFn: ()=>fetchData(displayAmount),
      select:(result)=>result.data
    });
  };