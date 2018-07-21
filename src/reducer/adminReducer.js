import * as types from "../action/actionType";

const defaultState = {
    category: [],
    foods: []
}

const adminReducer = (state = defaultState, action) => {
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
        default:
            return state;
    }
}

export default adminReducer;