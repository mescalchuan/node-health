import * as types from "./actionType";

// export function getCategory(category) {
//     return {
//         type: types.GET_CATEGORY,
//         category
//     }
// }

export function addFood() {
    return {
        type: types.ADD_FOOD
    }
}

export function editFood() {
    return {
        type: types.EDIT_FOOD
    }
}

export function deleteFood() {
    return {
        type: types.DELETE_FOOD
    }
}