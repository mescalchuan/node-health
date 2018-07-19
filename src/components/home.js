import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as server from "../server/homeServer";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Carousel } from "antd";
import "../css/index.scss";
import "../css/home.scss";

class Foods extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getBannerList(() => {
            console.log("succeed");
        })
    }
    render() {
        return (
            <div>
                <Carousel autoplay>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>
        )
    }
}

// 将actions绑定到props上
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(server, dispatch)
});

const mapStateToProps = (state) => ({
	bannerList: state.homeReducer.bannerList
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
