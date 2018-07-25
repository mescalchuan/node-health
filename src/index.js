import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import User from "./components/user";

const App = () => {
    return (
        <Provider store = {store} >
            <HashRouter>
                <Route path = "/" component = {User} ></Route>
            </HashRouter>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
