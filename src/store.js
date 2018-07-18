import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducer/index";
import thunkMiddleware from "redux-thunk";

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export const store = applyStoreMiddleware(RootReducer);