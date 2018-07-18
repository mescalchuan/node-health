import React, { Component } from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import Home from "./components/home";

const App = () => {
    return (
        <Provider store = {store} >
            <Home/>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
