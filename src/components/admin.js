import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./admin/login";
import AdminCenter from "./admin/center";
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
               {userInfo.hasLogin ? <AdminCenter/> : <Login/>}
            </div>
        )
    }
}
