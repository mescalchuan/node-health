import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as server from "../server/userServer";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Carousel, Input, Divider, Card, Rate, Row, Col } from "antd";
import "../css/index.scss";
import "../css/user.scss";
import food from "../testData";
import { getRateColor, getIconByCName } from "../common/utils";

const Search = Input.Search;
const { Meta } = Card;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starList: [food, food, food, food],
            tabooList: [food, food, food, food, food]
        }
    }
    renderStarList(list) {
        return (
            <div className = "star-list" >
                <Row>
                    {
                        list.map((item, index) => (
                            <Col span = {12} key = {index} >
                                <Row>
                                    <Col span = {18} >
                                        <p className = "star-title" >{this.state.starList[0].name}</p>
                                        <p className = "star-kcal" >热量：{this.state.starList[0].kcal} KJ/100g</p>
                                        <p className = "star-remark" >{this.state.starList[0].remark}</p>
                                    </Col>
                                    <Col span = {6}>
                                        <img src = {this.state.starList[0].imgUrl} />
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
        
    }
    componentDidMount() {
        // this.props.actions.getBannerList(() => {
        //     console.log("succeed");
        // })
        this.props.actions.getCategory(() => {
            console.log(this.props.category)
        });
    }
    render() {
        const fontStarList = this.state.starList.slice(0, 2);
        const endStarList = this.state.starList.slice(2);
        return (
            <div className = "user" >
                <Carousel autoplay>
                    <div className = "banner" >
                        <h1>只想让你更瘦一点点</h1>
                        <div className = "search-con" >
                            <Search
                                placeholder = "请输入食物名"
                                onSearch = {value => console.log(value)}
                            />
                        </div>
                    </div>
                </Carousel>
                <div className = "body" >
                    <Divider>分类</Divider> 
                    <div className = "category-recommon flex justify-space-between flex-wrap" >
                        {
                            this.props.category.map((item, index) => (
                                <div key = {index} >
                                    <Card style = {{width: 150, margin: 32}} >
                                        <div className = "category flex flex-column align-center" >
                                            <i className = {`icon iconfont icon-${getIconByCName(item.name).name}`} style = {{color: getIconByCName(item.name).color}} ></i>
                                            {item.name}
                                        </div>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                    <Divider>减脂之星</Divider>
                    <div className = "star-con" >
                        { this.renderStarList(fontStarList) }
                        { this.renderStarList(endStarList) }
                    </div> 
                    <Divider>禁忌</Divider> 
                    <div className = "taboo-list flex justify-space-between flex-wrap" >
                        {
                            this.state.tabooList.map((item, index) => (
                                <Card
                                    hoverable
                                    style = {{ width: 240 }}
                                    cover = {<img alt="example" src={item.imgUrl} />}
                                    key = {index}
                                >
                                    <Meta
                                        title = {item.name + " ( " + item.kcal + "KJ/100g )"}
                                        description = {
                                            <Rate count = {3} defaultValue = {item.rate} disabled color = {getRateColor(item.rate)} />
                                        }
                                    />
                                </Card>
                            ))
                        }
                    </div>
                </div>
                <div className = "footer">
                    Copyright © Mescal Chuan
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
	category: state.userReducer.category
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
