import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as server from "../../server/adminServer";
import { getData, postData } from "../../common/fetch";
import { Avatar, Input, Select, Button, Table, Modal, Icon, BackTop, message } from "antd";
import FoodCard from "../foodCard";
import AddModal from "../admin/addModal";
import "../../css/admin.scss";

const Option = Select.Option;
const confirm = Modal.confirm;
const type = {
    ADD: "ADD",
    EDIT: "EDIT"
}

class AdminCenter extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: "食物名",
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
                    <Button onClick = {() => this.changeCardVisible(record.key)} shape = "circle" icon = "eye-o" />
                    <Button onClick = {() => this.setState({currentType: type.EDIT, currentIndex: record.key, addVisible: true})} type = "danger" shape = "circle" icon = "edit" />
                    <Button onClick = {() => this.showDeleteConfirm(record.key)} type = "danger" shape = "circle" icon = "delete" />
                </div>
            ),
        }]
        this.state = {
            cardVisible: false,
            addVisvile: false,
            currentIndex: 0,
            searchInfo: {
                keyword: "",
                categoryId: ""
            },
            currentType: type.ADD
        }
    }
    logout() {
        this.props.actions.logout(() => {
            window.location.reload();
        }, res => {
            message.error(res.retMsg);
        })
    }
    componentDidMount() {
        this.props.actions.getCategory(null, res => message.error(res.retMsg));
        this.searchFoods();
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
    deleteFood(currentIndex) {
        const foodId = this.props.foods[currentIndex]._id;
        this.props.actions.deleteFood(foodId, () => {
            window.location.reload();
        }, res => message.error(res.retMsg));
    }
    changeAddVisible() {
        this.setState({
            addVisible: !this.state.addVisible
        })
    }
    showDeleteConfirm(currentIndex) {
        const self = this;
        confirm({
            title: '警告',
            content: '确定删除该食物吗？',
            okText: '是',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                self.deleteFood(currentIndex)
            },
            onCancel() {

            },
        });
    }
    searchFoods() {
        const {keyword, categoryId} = this.state.searchInfo;
        this.props.actions.searchFoods({keyword, categoryId}, null, res => message.error(res.retMsg));
    }
    render() {
        const isAdd = this.state.currentType == type.ADD;
        const food = this.props.foods[this.state.currentIndex];
        return (
            <div className = "center" >
                <div className = "header flex justify-space-between align-center" >
                    <h2>Node Health</h2>
                    <div className = "flex align-center">
                        <Avatar icon="user" />
                        <span>Admin</span>
                        <a href="javascript:void" onClick = {() => this.logout()} >注销</a>
                    </div>
                </div>
                
                <div className = "body" >
                    <h2>Node Health 后台管理系统</h2>
                    <div className = "search-con flex justify-center" >
                        <Input 
                            addonBefore="食物名" 
                            placeholder = "请输入食物名" 
                            value = {this.state.searchInfo.keyword} 
                            onChange = {e => this.setState({searchInfo: Object.assign({}, this.state.searchInfo, {keyword: e.target.value})})} 
                        />
                        <Select value = {this.state.searchInfo.categoryId} style={{ width: 120 }} onChange={value => {this.selectCategory(value)}} >
                            <Option value="">食物分类</Option>
                            {this.renderCategory()}
                        </Select>
                        <span>
                            <Button type="primary" icon="search" onClick = {() => this.searchFoods()} >搜索</Button>
                            <Button ghost onClick = {() => this.setState({currentType: type.ADD, addVisible: true})} >添加</Button>
                        </span>
                    </div>

                    <div className = "lists" >
                        <Table dataSource = {this.props.foods} columns = {this.columns} bordered pagination = {false} />
                    </div>
                    {
                        this.props.foods.length ? <Modal title = "食物详情" visible = {this.state.cardVisible} footer = {null} maskClosable = {false} onCancel = {() => this.changeCardVisible(this.state.currentIndex)} >
                            <FoodCard food = {food} />
                        </Modal> : null
                    }
                    <Modal title = {isAdd ? "添加" : "修改"} visible = {this.state.addVisible} footer = {null} maskClosable = {false} onCancel = {() => this.changeAddVisible()} destroyOnClose >
                        <AddModal category = {this.props.category} actions = {this.props.actions} isAdd = {isAdd} food = {isAdd ? {} : food} />
                    </Modal>
                </div>
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
    category: state.adminReducer.category,
    foods: state.adminReducer.foods
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCenter);