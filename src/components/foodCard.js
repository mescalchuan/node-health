import React, {Component} from 'react';
import { Divider, Rate, Table } from 'antd';
import {nutrientDisplay} from "../common/utils";
import "../css/food.scss";

const getRateColor = (rate) => {
    switch(rate) {
        case 3: return "green";
        case 2: return "#fabd14";
        case 1: return "red"
    }
}

const columns1 = [{
    title: "维生素A",
    dataIndex: "VA",
    key: "VA"
}, {
    title: "维生素C",
    dataIndex: "VC",
    key: "VC"
}, {
    title: "维生素E",
    dataIndex: "VE",
    key: "VE"
}, {
    title: "胡萝卜素",
    dataIndex: "carotene",
    key: "carotene"
}, {
    title: "维生素B1",
    dataIndex: "VB1",
    key: "VB1"
}, {
    title: "维生素B2",
    dataIndex: "VB2",
    key: "VB2"
}]

const columns2 = [{
    title: "镁",
    dataIndex: "MA",
    key: "MA"
}, {
    title: "钙",
    dataIndex: "CA",
    key: "CA"
}, {
    title: "铁",
    dataIndex: "FE",
    key: "FE"
}, {
    title: "锌",
    dataIndex: "ZN",
    key: "ZN"
}, {
    title: "铜",
    dataIndex: "CU",
    key: "CU"
}]

const columns3 = [{
    title: "锰",
    dataIndex: "MN",
    key: "MN"
}, {
    title: "钾",
    dataIndex: "K",
    key: "K"
}, {
    title: "磷",
    dataIndex: "P",
    key: "P"
}, {
    title: "钠",
    dataIndex: "NA",
    key: "NA"
}, {
    title: "硒",
    dataIndex: "SE",
    key: "SE"
}]

export default ({food}) => {
    return (
        <div className = "food-con" >
            <div className = "food-title flex justify-space-between align-center" >
                <div className = "flex" >
                    <img src = {food.imgUrl} />
                    <div style = {{marginLeft: 20}} >
                        <p className = "food-name" >{food.name}</p>
                        <p className = "kcal" >{food.kcal}千卡 / 100克</p>
                    </div>
                </div>
                <Rate value = {food.rate} count = {3} disabled style = {{color: getRateColor(food.rate)}} />
            </div>
            <div className = "basic flex justify-space-around" >
                <p style = {{width:"33.33%"}} >蛋白质：{nutrientDisplay(food.protein)} 克</p>
                <p style = {{width:"33.33%"}} >脂肪：{nutrientDisplay(food.fat)} 克</p>
                <p style = {{width:"33.33%"}} >碳水化合物：{nutrientDisplay(food.carbohydrate)} 克</p>
            </div>
            <div className = "basic flex justify-space-around" >
                <p style = {{width:"33.33%"}} >膳食纤维：{nutrientDisplay(food.DF)} 克</p>
                <p style = {{width:"33.33%"}} >烟酸：{nutrientDisplay(food.niacin)} 克</p>
                <p style = {{width:"33.33%"}} >胆固醇：{nutrientDisplay(food.cholesterol)} 克</p>
            </div>
            <Divider>维生素 / 100mg</Divider>
            <Table dataSource = {[food]} columns = {columns1} bordered pagination = {false} />
            <Divider>微量元素 / 100mg</Divider>
            <div className = "nutrient-first" >
                <Table dataSource = {[food]} columns = {columns2} bordered pagination = {false} />
            </div>
            <Table dataSource = {[food]} columns = {columns3} bordered pagination = {false} />
            <Divider>小贴士</Divider>
            <p className = "tips" >{food.remark}</p>
        </div>
    )
}