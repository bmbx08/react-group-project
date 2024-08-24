let initialState = {
  category: "모두",
  keyword: "",
  FavoritesList: [],
  productList: [],
  totalPrice: 0,
};

function reducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case "STORE_CURRENT_CATEGORY":
      return {...state, category: payload.category};
    case "STORE_KEYWORD":
      return {...state, keyword: payload.keyword};
    case "RESET_CURRENT_CATEGORY":
      return {...state, category: "모두"};
    case "RESET_KEYWORD":
      return {...state, keyword: ""};
    case "STORE_FAVORITE":
      // if(!state.FavoritesList.some((item)=> item.productId===payload.item.productId)) //store에 중복 즐겨찾기 상품이 없다면
      return {...state, FavoritesList: [...state.FavoritesList, payload.item]}; //FavoritesList에 상품 추가
    case "DELETE_FAVORITE":
      // if(state.FavoritesList.some((item)=> item.productId===payload.item.productId)){ //store에 중복 즐겨찾기 상품이 있을 때
      const newFavoritesList = state.FavoritesList.filter((item) => {
        //삭제할 상품을 제외한 상품들을 new 배열에 담음
        return !(item.productId === payload.item.productId);
      });
      return {...state, FavoritesList: newFavoritesList}; // new배열을 기존 배열과 교체
    // }

    case "ADD_CART":
      const existingProduct = state.productList.find(
        (product) =>
          product.name === payload.name &&
          product.color === payload.color &&
          product.size === payload.size
      );

      if (existingProduct) {
        // 동일한 제품이 있을 경우 수량을 증가시키기
        const updatedProductList = state.productList.map((product) =>
          product.name === payload.name &&
          product.color === payload.color &&
          product.size === payload.size
            ? {...product, quantity: payload.quantity}
            : product
        );

        const newTotalPrice = updatedProductList.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        );

        return {
          ...state,
          productList: updatedProductList,
          totalPrice: newTotalPrice,
        };
      } else {
        // 새로운 제품 추가
        const updatedProductList = [...state.productList, payload];

        const newTotalPrice = updatedProductList.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        );

        return {
          ...state,
          productList: updatedProductList,
          totalPrice: newTotalPrice,
        };
      }

    case "REMOVE_CART":
      const filteredProductList = state.productList.filter(
        (product) =>
          product.name !== payload.name ||
          product.color !== payload.color ||
          product.size !== payload.size
      );

      const recalculatedTotalPrice = filteredProductList.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );

      return {
        ...state,
        productList: filteredProductList,
        totalPrice: recalculatedTotalPrice,
      };

    case "UPDATE_CART":
      const updatedProductListForUpdate = state.productList.map((product) =>
        product.name === payload.name &&
        product.color === payload.currentColor &&
        product.size === payload.currentSize
          ? {
              ...product,
              color: payload.color,
              size: payload.size,
              quantity: payload.quantity,
            }
          : product
      );

      const updatedTotalPrice = updatedProductListForUpdate.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );

      return {
        ...state,
        productList: updatedProductListForUpdate,
        totalPrice: updatedTotalPrice,
      };

    case "CLEAR_CART":
      return {
        ...state,
        productList: [],
        totalPrice: 0,
      };

    default:
      return state;
  }
}

export default reducer;
