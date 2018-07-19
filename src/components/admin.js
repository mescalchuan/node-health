import React, {Component} from "react";
import ReactDOM from "react-dom";
import Login from "./login";
import "../css/admin.scss";

export default class Admin extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>
               <Login/>
            </div>
        )
    }
}
