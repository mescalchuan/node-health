import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as server from "../../server/adminServer";
import {getData, postData} from "../../common/fetch";
import { Avatar } from 'antd';
import "../../css/admin.scss";

class AdminCenter extends Component {
    constructor(props) {
        super(props);
        
    }
    logout() {
        this.props.actions.logout({token: userInfo.token}, () => {
            window.location.reload();
        }, res => {
            alert(res.retMsg);
        })
    }
    render() {
        return (
            <div className = "center" >
                <div className = "header flex justify-space-between align-center" >
                    <h2>Node Health</h2>
                    <div className = "flex align-center">
                        <Avatar size="large" icon="user" />
                        <span>Admin</span>
                        <a href="javascript:void" onClick = {() => this.logout()} >注销</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminCenter);