import React, { Component } from "react";
import * as server from "../server/userServer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Carousel, Input, Divider, Card, Rate, Row, Col, Modal, message } from "antd";
import FoodCard from "./foodCard";
import "../css/index.scss";
import "../css/user.scss";
import { getRateColor, getIconByCName } from "../common/utils";
import * as configs from "../config/static";

const Search = Input.Search;
const { Meta } = Card;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cIndex: null,
            food: {},
            cardVisible: false,
            additional: []
        }
    }
    listLeft(listLength) {
        const columns = Math.floor((document.body.clientWidth - 60) / 240);
        const lastColCount = listLength % columns;
        const additionCount = lastColCount == 0 ? 0 : columns - lastColCount;
        let arr = [];
        for(let index = 0; index < additionCount; index ++) {
            arr[index] = index;
        }
        this.setState({
            additional: arr
        })
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
                                        <p className = "star-title" >{item.name}</p>
                                        <p className = "star-kcal" >热量：{item.kcal} KJ/100g</p>
                                        <p className = "star-remark" >{item.remark}</p>
                                    </Col>
                                    <Col span = {6}>
                                        <img src = {item.imgUrl} onClick = {() => this.changeCardVisible(item)} />
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
        
    }
    categoryHover(index) {
        const cIndex = this.state.cIndex == null ? index : null;
        this.setState({
            cIndex
        })
    }
    changeCardVisible(food) {
        if(food.name) {
            this.setState({
                cardVisible: !this.state.cardVisible,
                food
            })
        }
        else {
            this.setState({
                cardVisible: !this.state.cardVisible
            }, () => {
                this.setState({
                    food
                })
            })
        }
    }
    searchFoods(keyword, categoryId) {
        this.props.actions.setSearchInfo(keyword, categoryId, () => {
            this.props.history.push("/search");
        }, res => message.error(res.retMsg))
    }
    getStarList() {
        this.props.actions.getHomeList({sortKey: "kcal", sortType: configs.ASC}, configs.STAR_LIST, null, res => message.error(res.retMsg));
    }
    getTabooList() {
        this.props.actions.getHomeList({sortKey: "kcal", sortType: configs.DESC}, configs.TABOO_LIST, () => {
            this.listLeft(this.props.tabooList.length);
        }, res => message.error(res.retMsg));
    }
    componentDidMount() {
        // this.props.actions.getBannerList(() => {
        //     console.log("succeed");
        // })
        this.props.actions.getCategory(null, res => message.error(res.retMsg));
        this.getStarList();
        this.getTabooList();
        window.addEventListener("resize", () => {
            this.listLeft(this.props.tabooList.length);
        })
    }
    render() {
        const fontStarList = this.props.starList.slice(0, 2);
        const endStarList = this.props.starList.slice(2);
        return (
            <div className = "user" >
                <Carousel autoplay>
                    <div className = "banner" >
                        <h1>只想让你更瘦一点点</h1>
                        <div className = "search-con" >
                            <Search
                                placeholder = "请输入食物名"
                                onSearch = {value => this.searchFoods(value, "")}
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
                                    <Card style = {{width: 150, margin: 32, borderColor: this.state.cIndex != null ? this.state.cIndex == index ? getIconByCName(item.name).color : "#eeeeee" : "#eeeeee"}} >
                                        <div 
                                            className = "category flex flex-column align-center" 
                                            onMouseOver = {() => this.categoryHover(index)} 
                                            onMouseOut = {() => this.categoryHover(index)}
                                            onClick = {() => this.searchFoods("", item._id)}
                                        >
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
                            this.props.tabooList.map((item, index) => (
                                <div onClick = {() => this.changeCardVisible(item)} key = {index} >
                                    <Card
                                        hoverable
                                        style = {{ width: 240 }}
                                        cover = {<img alt="example" src={item.imgUrl} />}
                                    >
                                        <Meta
                                            title = {
                                                <div className = "flex justify-space-between" >
                                                    <p>{item.name}</p>
                                                    <Rate count = {3} defaultValue = {item.rate} disabled style = {{color: getRateColor(item.rate)}} />
                                                </div>
                                            }
                                            description = {
                                                <div>
                                                    <p>热量 -- {item.kcal + " KJ/100g"}</p>
                                                    <p style = {{fontSize: 12}} >脂肪 -- {item.fat + " g/100g"}</p>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </div>
                            ))
                        }
                        {
                            this.state.additional.map((item, index) => (
                                <div style = {{width: 240, height: 351}} key = {index} ></div>
                            ))
                        }
                    </div>
                </div>
                <div className = "footer">
                    Copyright © Mescal Chuan
                </div>
                <Modal title = "食物详情" visible = {this.state.cardVisible} footer = {null} maskClosable = {false} onCancel = {() => this.changeCardVisible({})} >
                    <FoodCard food = {this.state.food} />
                </Modal>
            </div>
        )
    }
}

// 将actions绑定到props上
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(server, dispatch)
});

const mapStateToProps = (state) => ({
    category: state.userReducer.category,
    keyword: state.userReducer.keyword,
    categoryId: state.userReducer.categoryId,
    starList: state.userReducer.starList,
    tabooList: state.userReducer.tabooList
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
