import React, { Component } from "react";
import { Input, Button } from "antd";
import * as server from "../../server/adminServer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../css/login.scss";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }
    inputChange(type, e) {
        const key = type === 0 ? "userName" : "password";
        this.setState({
            [key]: e.target.value
        })
    }
    login() {
        const {userName, password} = this.state;
        this.props.actions.login({
            userName,
            password
        }, () => {
            window.location.reload();
        }, res => {
            alert(res.retMsg);
        });
    }
    render() {
        return (
            <div className = "login flex" >
                <div className = "flex-1 login-img"></div>
                <div className = "flex flex-1 justify-center align-center" style = {{backgroundColor: "white"}} >
                    <div className = "login-con flex flex-column">
                        <p>Node Healthy</p>
                        <Input placeholder = "管理员账号" onChange = {(e) => this.inputChange(0, e)} value = {this.state.userName} />
                        <Input placeholder = "管理员密码" onChange = {(e) => this.inputChange(1, e)} value = {this.state.password} />
                        <Button onClick = {() => this.login()}>登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}


// 将actions绑定到props上
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(server, dispatch)
});

const mapStateToProps = (state) => ({
	
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);