let initialState={
    category: "모두"
}

function reducer(state=initialState,action){
    switch(action.type){
        case "STORE CURRENT CATEGORY":
            return{...state, category:action.payload.category};
        default:
            return{...state};    
    }
}

export default reducer;