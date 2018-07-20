import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as server from "../../server/adminServer";
import {getData, postData} from "../../common/fetch";

class AdminCenter extends Component {
    constructor(props) {
        super(props);
        
    }
    get() {
        getData("/api/admin/123");
    }
    post() {
        postData("/api/admin/456", {token: userInfo.token});
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
            <div>
               登录成功
               <span>{userInfo.token}</span>
               <button onClick={() => this.get()}>get</button>
               <button onClick={() => this.post()}>post</button>   
               <button onClick={() => this.logout()}>注销</button>
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