import React, { Component } from "react";
import * as server from "../server/userServer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Rate, Modal, Select, Button, Card, message, BackTop } from "antd";
import FoodCard from "./foodCard";
import "../css/index.scss";
import "../css/searchResult.scss";
import { getRateColor, getIconByCName } from "../common/utils";

const Option = Select.Option;
const { Meta } = Card;

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            categoryId: "",
            currentIndex: 0,
            cardVisible: false,
            additional: []
        }
    }
    listLeft(listLength) {
        const columns = Math.floor((document.body.clientWidth - 240) / 200);
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
    renderCategory() {
        return this.props.category.map((item, index) => {
            return <Option value = {item._id} key = {index} >{item.name}</Option>
        })
    }
    changeCardVisible(currentIndex) {
        this.setState({
            cardVisible: !this.state.cardVisible,
            currentIndex
        })
    }
    selectCategory(value) {
        this.setState({
            categoryId: value
        })
    }
    searchFoods(successBK) {
        const {keyword, categoryId} = this.state;
        this.props.actions.searchFoods({keyword, categoryId}, () => {
            !this.props.foods.length && message.warning("未搜到食物");
            successBK && successBK();
        }, res => message.error(res.retMsg));
    }
    componentWillMount() {
        this.setState({
            keyword: this.props.keyword,
            categoryId: this.props.categoryId
        })
    }
    componentDidMount() {
        this.props.actions.getCategory(null, res => message.error(res.retMsg));
        this.searchFoods(() => {
            this.listLeft(this.props.foods.length);
        });
        window.addEventListener("resize", () => {
            this.listLeft(this.props.foods.length);
        })
    }
    render() {
        const food = this.props.foods[this.state.currentIndex];
        return (
            <div className = "search-result" >
                <div className = "header flex justify-center" >
                    <Button icon = "left" onClick = {() => this.props.history.goBack()} ></Button>
                    <Input 
                        placeholder = "请输入食物名" 
                        value = {this.state.keyword} 
                        onChange = {e => this.setState({keyword: e.target.value})} 
                    />
                    <Select value = {this.state.categoryId} style={{ width: 120 }} onChange={value => {this.selectCategory(value)}} >
                        <Option value="">食物分类</Option>
                        {this.renderCategory()}
                    </Select>
                    <Button type = "primary" icon = "search" onClick = {() => this.searchFoods(() => this.listLeft(this.props.foods.length))} >搜索</Button>
                </div>
                <div className = "body flex justify-space-between flex-wrap" >
                    {
                        this.props.foods.map((item, index) => (
                            <div className = "food-con" onClick = {() => this.changeCardVisible(index)} key = {index} >
                                <Card
                                    hoverable
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
                            <div className = "food-con" key = {index} ></div>
                        ))
                    }
                </div>
                {
                    this.props.foods.length ? <Modal title = "食物详情" visible = {this.state.cardVisible} footer = {null} maskClosable = {false} onCancel = {() => this.changeCardVisible(this.state.currentIndex)} >
                        <FoodCard food = {food} />
                    </Modal> : null
                }
                {
                    !this.props.foods.length ? <img className = "empty" src = "../img/empty.jpg" /> : null
                }
                <BackTop />
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
    foods: state.userReducer.foods,
    keyword: state.userReducer.keyword,
    categoryId: state.userReducer.categoryId
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);