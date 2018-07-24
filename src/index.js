import React, { Component } from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import User from "./components/user";

const App = () => {
    return (
        <Provider store = {store} >
            <User/>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
