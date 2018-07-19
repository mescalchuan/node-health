import React, { Component } from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import Admin from "./components/admin";

const App = () => {
    return (
        <Provider store = {store} >
            <Admin/>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));