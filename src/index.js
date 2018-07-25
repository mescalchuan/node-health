import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import User from "./components/user";
import SearchResult from "./components/searchResult";

class Home extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
  

const App = () => (
    <Provider store = {store} >
        <HashRouter>
            <Home>
                <Route exact path = "/" component = {User} />
                <Route path = "/search" component = {SearchResult} />
            </Home>
        </HashRouter>
    </Provider>
)

ReactDOM.render(<App/>, document.getElementById("app"));
