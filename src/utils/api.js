import axios from "axios";

// const API_KEY = process.env.REACT_APP_API_KEY;

const client_id="nXw4Ep53fsD6UQjNvZ6U";
const client_secret="AYSOUsJiZJ";

const api = axios.create({
  baseURL: "/v1/search",
  headers: {
    'X-Naver-Client-Id': client_id,
    'X-Naver-Client-Secret': client_secret
  },
});

//인터셉터(선택사항)
axios.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  }, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  });

// 응답 인터셉터 추가하기
axios.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  }, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  });

export default api;