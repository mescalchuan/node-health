import * as types from "../action/actionType";

const defaultState = {
    bannerList: [],
    category: []
}

const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case types.GET_BANNER: 
            return Object.assign({}, state, {
                bannerList: action.bannerList
            })
        case types.GET_CATEGORY: 
            return Object.assign({}, state, {
                category: action.category
            })
        default:
            return state;
    }
}

export default userReducer;