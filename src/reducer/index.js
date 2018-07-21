import { combineReducers } from "redux";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
    userReducer,
    adminReducer
});
