import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as server from "../server/userServer";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Carousel, Input, Divider, Card, Rate } from "antd";
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
            starList: [food, food, food, food, food]
        }
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
                    <Divider>减脂之星</Divider> 
                    <div className = "star-list flex justify-space-between flex-wrap" >
                        {
                            this.state.starList.map((item, index) => (
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
                    <Divider>分类</Divider> 
                    <div className = "category-recommon flex justify-space-between flex-wrap" >
                        {
                            this.props.category.map((item, index) => (
                                <div key = {index} >
                                    <Card style = {{width: 150, margin: 32}} >
                                        {item.name}
                                        <i className = {`icon iconfont icon-${getIconByCName(item.name)}`}></i>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>>
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
