import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchuseDetail = () => {
    return api.get('/shop.json?query=steadyeverywear&display=100&');
  };
  
  export const useDetail = () => {
    return useQuery({
      queryKey: ["product-detail"],
      queryFn: fetchuseDetail,
      select:(result)=>result.data
    });
  };