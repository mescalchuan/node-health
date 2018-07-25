import * as types from "../action/actionType";
import * as configs from "../config/static";

const defaultState = {
    foods: [],
    category: [],
    starList: [],
    tabooList: [],
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
        case types.GET_HOME_LIST:
            switch(action.moduleType) {
                case configs.STAR_LIST: 
                    return Object.assign({}, state, {
                        starList: action.foods
                    })
                case configs.TABOO_LIST: 
                    return Object.assign({}, state, {
                        tabooList: action.foods
                    })
                default: return state;
            }
        default:
            return state;
    }
}

export default userReducer;