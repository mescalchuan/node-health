import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as server from "../../server/adminServer";
import * as userServer from "../../server/userServer";
import {getData, postData} from "../../common/fetch";
import { Avatar, Input, Select, Button, Table, Modal } from 'antd';
import FoodCard from "../foodCard";
import AddModal from "../admin/addModal";
import "../../css/admin.scss";

const Option = Select.Option;
const type = {
    ADD: "ADD",
    EDIT: "EDIT"
}

class AdminCenter extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: "名字",
            dataIndex: "name",
            key: "name"
        }, {
            title: "热量(千卡/100克)",
            dataIndex: "kcal",
            key: "kcal"
        }, {
            title: "蛋白质(克)",
            dataIndex: "protein",
            key: "protein"
        }, {
            title: "脂肪(克)",
            dataIndex: "fat",
            key: "fat"
        }, {
            title: "碳水化合物(克)",
            dataIndex: "carbohydrate",
            key: "carbohydrate"
        }, {
            title: "膳食纤维(克)",
            dataIndex: "DF",
            key: "DF"
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <div className = "flex justify-space-around" >
                    <Button onClick = {() => this.changeCardVisible(record.key)}>详情</Button>
                    <Button>编辑</Button>
                    <Button>删除</Button>
                </div>
            ),
        }]
        this.state = {
            cardVisible: false,
            addVisvile: false,
            currentIndex: 0,
            searchInfo: {
                categoryId: ""
            },
            currentType: type.ADD
        }
    }
    logout() {
        this.props.actions.logout(() => {
            window.location.reload();
        }, res => {
            alert(res.retMsg);
        })
    }
    componentDidMount() {
        this.props.userActions.getCategory();
        this.props.userActions.searchFoods();
    }
    renderCategory() {
        return this.props.category.map((item, index) => {
            return <Option value = {item._id} key = {index} >{item.name}</Option>
        })
    }
    selectCategory(value) {
        let _searchInfo = JSON.parse(JSON.stringify(this.state.searchInfo));
        _searchInfo.categoryId = value;
        this.setState({
            searchInfo: _searchInfo
        })
    }
    changeCardVisible(currentIndex) {
        this.setState({
            cardVisible: !this.state.cardVisible,
            currentIndex
        });
    }
    changeAddVisible() {
        this.setState({
            addVisible: !this.state.addVisible
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
                
                <div className = "body" >
                    <div className = "search-con" >
                        <Input addonBefore="食物名" placeholder = "请输入食物名" />
                        <Select value = {this.state.searchInfo.categoryId} style={{ width: 120 }} onChange={value => {this.selectCategory(value)}} >
                            <Option value="">食物分类</Option>
                            {this.renderCategory()}
                        </Select>
                        <Button type="primary" icon="search">Search</Button>
                    </div>

                    <div className = "lists" >
                        <Table dataSource = {this.props.foods} columns = {this.columns} bordered />
                    </div>

                    <Button onClick = {() => this.setState({currentType: type.ADD, addVisible: true})} >添加</Button>
                    {
                        this.props.foods.length ? <Modal title = "食物详情" visible = {this.state.cardVisible} footer = {null} onCancel = {() => this.changeCardVisible(this.state.currentIndex)} >
                            <FoodCard food = {this.props.foods[this.state.currentIndex]} />
                        </Modal> : null
                    }
                    <Modal title = {this.state.currentType == type.ADD ? "添加" : "修改"} visible = {this.state.addVisible} footer = {null} onCancel = {() => this.changeAddVisible()} >
                        <AddModal category = {this.props.category} actions = {this.props.actions} />
                    </Modal>
                </div>
            </div>
        )
    }
}


// 将actions绑定到props上
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(server, dispatch),
    userActions: bindActionCreators(userServer, dispatch)
});

const mapStateToProps = (state) => ({
    category: state.adminReducer.category,
    foods: state.adminReducer.foods
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCenter);