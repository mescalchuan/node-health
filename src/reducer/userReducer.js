import * as types from "../action/actionType";

const defaultState = {
    foods: [],
    category: [],
    keyword: "",
    categoryId: ""
}

const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case types.GET_CATEGORY: 
            return Object.assign({}, state, {
                category: action.category
            })
        case types.SEARCH_FOODS:
            return Object.assign({}, state, {
                foods: action.foods.map((item, index) => {
                    item.key = index;
                    return item;
                })
            })
        case types.SET_SEARCH_INFO:
            return Object.assign({}, state, action.searchInfo)
        default:
            return state;
    }
}

export default userReducer;